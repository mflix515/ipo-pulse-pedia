
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdPlacement from '@/components/AdPlacement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator as CalculatorIcon, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type IPO = Tables<'ipos'>;
type IPOTrade = Tables<'ipo_trades'>;

const Calculator = () => {
  const { user } = useAuth();
  const [selectedIPO, setSelectedIPO] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDate, setSellDate] = useState('');
  const [useGMP, setUseGMP] = useState(false);
  const [customGMP, setCustomGMP] = useState('');
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [userTrades, setUserTrades] = useState<IPOTrade[]>([]);
  const [newListedIPOs, setNewListedIPOs] = useState<IPO[]>([]);
  const [results, setResults] = useState<{
    investedAmount: number;
    currentValue: number;
    profitLoss: number;
    profitLossPercentage: number;
    sellValue?: number;
    actualProfitLoss?: number;
    actualProfitLossPercentage?: number;
  } | null>(null);

  useEffect(() => {
    fetchIPOs();
    fetchNewListedIPOs();
    if (user) {
      fetchUserTrades();
    }
  }, [user]);

  const fetchIPOs = async () => {
    try {
      const { data, error } = await supabase
        .from('ipos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIpos(data || []);
    } catch (error) {
      console.error('Error fetching IPOs:', error);
    }
  };

  const fetchNewListedIPOs = async () => {
    try {
      const { data, error } = await supabase
        .from('ipos')
        .select('*')
        .eq('status', 'listed')
        .not('listing_price', 'is', null)
        .order('listing_date', { ascending: false })
        .limit(10);

      if (error) throw error;
      setNewListedIPOs(data || []);
    } catch (error) {
      console.error('Error fetching new listed IPOs:', error);
    }
  };

  const fetchUserTrades = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('ipo_trades')
        .select('*, ipos(name)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserTrades(data || []);
    } catch (error) {
      console.error('Error fetching user trades:', error);
    }
  };

  const calculateProfitLoss = () => {
    const selectedIPOData = ipos.find(ipo => ipo.id === selectedIPO);
    if (!selectedIPOData || !lotSize) return;

    const lots = parseInt(lotSize);
    const shares = lots * (selectedIPOData.lot_size || 0);
    const issuePrice = parseFloat(selectedIPOData.price_range?.split('-')[0] || '0');
    const investedAmount = shares * issuePrice;
    
    let currentPrice = parseFloat(selectedIPOData.current_price || '0');
    
    // If IPO is not listed and user wants to use GMP
    if (!currentPrice && useGMP) {
      const gmpValue = customGMP ? parseFloat(customGMP) : parseFloat(selectedIPOData.gmp || '0');
      if (gmpValue) {
        currentPrice = issuePrice + gmpValue;
      }
    }

    if (currentPrice) {
      const currentValue = shares * currentPrice;
      const profitLoss = currentValue - investedAmount;
      const profitLossPercentage = (profitLoss / investedAmount) * 100;

      let sellValue, actualProfitLoss, actualProfitLossPercentage;
      
      if (sellPrice) {
        const sellPriceNum = parseFloat(sellPrice);
        sellValue = shares * sellPriceNum;
        actualProfitLoss = sellValue - investedAmount;
        actualProfitLossPercentage = (actualProfitLoss / investedAmount) * 100;
      }

      setResults({
        investedAmount,
        currentValue,
        profitLoss,
        profitLossPercentage,
        sellValue,
        actualProfitLoss,
        actualProfitLossPercentage
      });
    }
  };

  const saveTradeRecord = async () => {
    if (!user || !selectedIPO || !lotSize) return;
    
    const selectedIPOData = ipos.find(ipo => ipo.id === selectedIPO);
    if (!selectedIPOData) return;

    try {
      const issuePrice = parseFloat(selectedIPOData.price_range?.split('-')[0] || '0');
      const listingPrice = parseFloat(selectedIPOData.listing_price || '0');
      const sellPriceNum = sellPrice ? parseFloat(sellPrice) : null;
      const profitLoss = results?.actualProfitLoss || results?.profitLoss || 0;

      const { error } = await supabase
        .from('ipo_trades')
        .insert({
          user_id: user.id,
          ipo_id: selectedIPO,
          lots_applied: parseInt(lotSize),
          lots_allotted: parseInt(lotSize), // Assuming full allotment for calculator
          issue_price: issuePrice,
          listing_price: listingPrice || null,
          sell_price: sellPriceNum,
          sell_date: sellDate || null,
          profit_loss: profitLoss
        });

      if (error) throw error;
      
      fetchUserTrades();
      alert('Trade record saved successfully!');
    } catch (error) {
      console.error('Error saving trade:', error);
      alert('Error saving trade record');
    }
  };

  const selectedIPOData = ipos.find(ipo => ipo.id === selectedIPO);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ad Placement */}
        <AdPlacement size="banner" position="calculator-top" className="mb-6" />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Profit/Loss Calculator</h1>
          <p className="text-lg text-gray-600">
            Calculate your potential profits or losses from IPO investments and track your performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="calculator-left" />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Calculator Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalculatorIcon className="h-5 w-5 mr-2" />
                    IPO Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="ipo-select">Select IPO</Label>
                    <Select value={selectedIPO} onValueChange={setSelectedIPO}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose an IPO" />
                      </SelectTrigger>
                      <SelectContent>
                        {ipos.map(ipo => (
                          <SelectItem key={ipo.id} value={ipo.id}>
                            {ipo.name} - ₹{ipo.price_range} ({ipo.status})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedIPOData && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">{selectedIPOData.name}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Price Range: ₹{selectedIPOData.price_range}</p>
                        <p>Lot Size: {selectedIPOData.lot_size} shares</p>
                        {selectedIPOData.current_price && (
                          <p>Current Price: ₹{selectedIPOData.current_price}</p>
                        )}
                        {selectedIPOData.gmp && (
                          <p>GMP: ₹{selectedIPOData.gmp}</p>
                        )}
                        <p>Status: {selectedIPOData.status}</p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="lot-size">Number of Lots</Label>
                    <Input
                      id="lot-size"
                      type="number"
                      placeholder="Enter number of lots"
                      value={lotSize}
                      onChange={(e) => setLotSize(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="sell-price">Sell Price (Optional)</Label>
                    <Input
                      id="sell-price"
                      type="number"
                      placeholder="Enter sell price per share"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                    />
                  </div>

                  {sellPrice && (
                    <div>
                      <Label htmlFor="sell-date">Sell Date (Optional)</Label>
                      <Input
                        id="sell-date"
                        type="date"
                        value={sellDate}
                        onChange={(e) => setSellDate(e.target.value)}
                      />
                    </div>
                  )}

                  {selectedIPOData && !selectedIPOData.current_price && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="use-gmp"
                          checked={useGMP}
                          onCheckedChange={(checked) => setUseGMP(checked === true)}
                        />
                        <Label htmlFor="use-gmp">Use GMP for calculation</Label>
                      </div>
                      
                      {useGMP && (
                        <div>
                          <Label htmlFor="custom-gmp">Custom GMP (optional)</Label>
                          <Input
                            id="custom-gmp"
                            type="number"
                            placeholder={`Default: ₹${selectedIPOData.gmp || 0}`}
                            value={customGMP}
                            onChange={(e) => setCustomGMP(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button onClick={calculateProfitLoss} className="flex-1">
                      Calculate P&L
                    </Button>
                    {user && results && (
                      <Button onClick={saveTradeRecord} variant="outline">
                        Save Record
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Calculation Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-blue-700">Invested Amount</h4>
                          <p className="text-xl font-bold text-blue-900">₹{results.investedAmount.toLocaleString()}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-green-700">Current Value</h4>
                          <p className="text-xl font-bold text-green-900">₹{results.currentValue.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${results.profitLoss >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${results.profitLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            Unrealized {results.profitLoss >= 0 ? 'Profit' : 'Loss'}
                          </h4>
                          {results.profitLoss >= 0 ? (
                            <TrendingUp className="h-5 w-5 text-green-600" />
                          ) : (
                            <TrendingDown className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <p className={`text-2xl font-bold ${results.profitLoss >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                          ₹{Math.abs(results.profitLoss).toLocaleString()}
                        </p>
                        <p className={`text-sm ${results.profitLoss >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                          {results.profitLossPercentage >= 0 ? '+' : ''}{results.profitLossPercentage.toFixed(2)}%
                        </p>
                      </div>

                      {results.sellValue && (
                        <div className={`p-4 rounded-lg ${(results.actualProfitLoss || 0) >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${(results.actualProfitLoss || 0) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                              Realized {(results.actualProfitLoss || 0) >= 0 ? 'Profit' : 'Loss'}
                            </h4>
                            <DollarSign className="h-5 w-5 text-gray-600" />
                          </div>
                          <p className={`text-2xl font-bold ${(results.actualProfitLoss || 0) >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                            ₹{Math.abs(results.actualProfitLoss || 0).toLocaleString()}
                          </p>
                          <p className={`text-sm ${(results.actualProfitLoss || 0) >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {(results.actualProfitLossPercentage || 0) >= 0 ? '+' : ''}{(results.actualProfitLossPercentage || 0).toFixed(2)}%
                          </p>
                          <p className="text-xs text-gray-500">Sell Value: ₹{results.sellValue.toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <CalculatorIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Select an IPO and enter lot size to calculate P&L</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Banner Ad */}
            <AdPlacement size="banner" position="calculator-middle" className="my-8" />

            {/* Recently Listed IPOs with P&L */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recently Listed IPOs Performance</CardTitle>
              </CardHeader>
              <CardContent>
                {newListedIPOs.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recently listed IPOs found.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newListedIPOs.map((ipo) => {
                      const issuePrice = parseFloat(ipo.price_range?.split('-')[0] || '0');
                      const listingPrice = parseFloat(ipo.listing_price || '0');
                      const currentPrice = parseFloat(ipo.current_price || '0') || listingPrice;
                      const listingGain = listingPrice - issuePrice;
                      const currentGain = currentPrice - issuePrice;
                      const listingGainPercent = (listingGain / issuePrice) * 100;
                      const currentGainPercent = (currentGain / issuePrice) * 100;

                      return (
                        <div key={ipo.id} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sm mb-2">{ipo.name}</h4>
                          <div className="text-xs space-y-1">
                            <p>Issue Price: ₹{issuePrice}</p>
                            <p>Listing Price: ₹{listingPrice}</p>
                            <p>Current Price: ₹{currentPrice}</p>
                            <div className={`font-medium ${listingGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              Listing Gain: ₹{listingGain.toFixed(2)} ({listingGainPercent.toFixed(1)}%)
                            </div>
                            <div className={`font-medium ${currentGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              Current Gain: ₹{currentGain.toFixed(2)} ({currentGainPercent.toFixed(1)}%)
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* User's IPO Trades History */}
            {user && userTrades.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Your IPO Trading History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userTrades.map((trade) => (
                      <div key={trade.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{(trade as any).ipos?.name}</h4>
                            <p className="text-sm text-gray-600">
                              {trade.lots_applied} lots • Issue: ₹{trade.issue_price}
                              {trade.sell_price && ` • Sold: ₹${trade.sell_price}`}
                            </p>
                          </div>
                          <div className={`text-right ${(trade.profit_loss || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <p className="font-bold">
                              {(trade.profit_loss || 0) >= 0 ? '+' : ''}₹{Math.abs(trade.profit_loss || 0).toLocaleString()}
                            </p>
                            <p className="text-xs">
                              {((trade.profit_loss || 0) / ((trade.issue_price || 0) * (trade.lots_applied || 0) * 100) * 100).toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Sidebar Ad */}
          <div className="hidden lg:block lg:col-span-2">
            <AdPlacement size="sidebar" position="calculator-right" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calculator;
