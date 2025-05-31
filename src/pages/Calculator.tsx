
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator as CalculatorIcon, TrendingUp, TrendingDown } from 'lucide-react';

const Calculator = () => {
  const [selectedIPO, setSelectedIPO] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [useGMP, setUseGMP] = useState(false);
  const [customGMP, setCustomGMP] = useState('');
  const [results, setResults] = useState<{
    investedAmount: number;
    currentValue: number;
    profitLoss: number;
    profitLossPercentage: number;
  } | null>(null);

  // Mock IPO data
  const ipos = [
    { id: '1', name: 'Tech Corp Limited', issuePrice: 250, currentPrice: 320, gmp: 150, lotSize: 100, status: 'listed' },
    { id: '2', name: 'Green Energy Solutions', issuePrice: 180, currentPrice: null, gmp: 45, lotSize: 150, status: 'upcoming' },
    { id: '3', name: 'FinTech Innovations', issuePrice: 300, currentPrice: 285, gmp: null, lotSize: 50, status: 'listed' }
  ];

  const calculateProfitLoss = () => {
    const selectedIPOData = ipos.find(ipo => ipo.id === selectedIPO);
    if (!selectedIPOData || !lotSize) return;

    const lots = parseInt(lotSize);
    const shares = lots * selectedIPOData.lotSize;
    const investedAmount = shares * selectedIPOData.issuePrice;
    
    let currentPrice = selectedIPOData.currentPrice;
    
    // If IPO is not listed and user wants to use GMP
    if (!currentPrice && useGMP) {
      const gmpValue = customGMP ? parseFloat(customGMP) : selectedIPOData.gmp;
      if (gmpValue) {
        currentPrice = selectedIPOData.issuePrice + gmpValue;
      }
    }

    if (currentPrice) {
      const currentValue = shares * currentPrice;
      const profitLoss = currentValue - investedAmount;
      const profitLossPercentage = (profitLoss / investedAmount) * 100;

      setResults({
        investedAmount,
        currentValue,
        profitLoss,
        profitLossPercentage
      });
    }
  };

  const selectedIPOData = ipos.find(ipo => ipo.id === selectedIPO);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IPO Profit/Loss Calculator</h1>
          <p className="text-lg text-gray-600">
            Calculate your potential profits or losses from IPO investments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalculatorIcon className="h-5 w-5 mr-2" />
                Calculator
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
                        {ipo.name} - ₹{ipo.issuePrice} ({ipo.status})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedIPOData && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{selectedIPOData.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Issue Price: ₹{selectedIPOData.issuePrice}</p>
                    <p>Lot Size: {selectedIPOData.lotSize} shares</p>
                    {selectedIPOData.currentPrice && (
                      <p>Current Price: ₹{selectedIPOData.currentPrice}</p>
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

              {selectedIPOData && !selectedIPOData.currentPrice && (
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

              <Button onClick={calculateProfitLoss} className="w-full">
                Calculate P&L
              </Button>
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
                        {results.profitLoss >= 0 ? 'Profit' : 'Loss'}
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
      </div>

      <Footer />
    </div>
  );
};

export default Calculator;
