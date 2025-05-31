
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator as CalculatorIcon, TrendingUp, TrendingDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Calculator = () => {
  const [selectedIPO, setSelectedIPO] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [shares, setShares] = useState('');
  const [useGMP, setUseGMP] = useState(false);
  const [results, setResults] = useState(null);

  // Mock IPO data
  const ipoList = [
    { id: 'techcorp', name: 'TechCorp Limited', issuePrice: 280, currentPrice: 325, gmp: 45, isListed: true },
    { id: 'greenenergy', name: 'Green Energy Solutions', issuePrice: 200, currentPrice: null, gmp: 25, isListed: false },
    { id: 'finserv', name: 'FinServ Bank', issuePrice: 380, currentPrice: 445, gmp: 65, isListed: true },
  ];

  const calculateProfitLoss = () => {
    const ipo = ipoList.find(i => i.id === selectedIPO);
    if (!ipo) return;

    const totalShares = lotSize ? parseInt(lotSize) * 50 : parseInt(shares) || 0; // Assuming 50 shares per lot
    const investedAmount = totalShares * ipo.issuePrice;
    
    let currentValue;
    let currentPrice;
    
    if (ipo.isListed && !useGMP) {
      currentPrice = ipo.currentPrice;
      currentValue = totalShares * ipo.currentPrice;
    } else {
      currentPrice = ipo.issuePrice + ipo.gmp;
      currentValue = totalShares * currentPrice;
    }
    
    const profitLoss = currentValue - investedAmount;
    const profitLossPercentage = ((profitLoss / investedAmount) * 100).toFixed(2);

    setResults({
      ipoName: ipo.name,
      totalShares,
      investedAmount,
      currentValue,
      currentPrice,
      profitLoss,
      profitLossPercentage,
      isProfit: profitLoss >= 0,
      isListed: ipo.isListed,
      usedGMP: useGMP || !ipo.isListed
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <CalculatorIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IPO Profit/Loss Calculator</h1>
          <p className="text-gray-600">Calculate your potential returns from IPO investments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Returns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="ipo-select">Select IPO</Label>
                <Select value={selectedIPO} onValueChange={setSelectedIPO}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an IPO" />
                  </SelectTrigger>
                  <SelectContent>
                    {ipoList.map(ipo => (
                      <SelectItem key={ipo.id} value={ipo.id}>
                        {ipo.name} - ₹{ipo.issuePrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lot-size">Number of Lots</Label>
                  <Input
                    id="lot-size"
                    type="number"
                    placeholder="e.g., 2"
                    value={lotSize}
                    onChange={(e) => {
                      setLotSize(e.target.value);
                      setShares('');
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">1 lot = 50 shares</p>
                </div>
                <div>
                  <Label htmlFor="shares">Or Number of Shares</Label>
                  <Input
                    id="shares"
                    type="number"
                    placeholder="e.g., 100"
                    value={shares}
                    onChange={(e) => {
                      setShares(e.target.value);
                      setLotSize('');
                    }}
                  />
                </div>
              </div>

              {selectedIPO && ipoList.find(i => i.id === selectedIPO)?.isListed && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="use-gmp"
                    checked={useGMP}
                    onCheckedChange={setUseGMP}
                  />
                  <Label htmlFor="use-gmp" className="text-sm">
                    Use GMP instead of current market price
                  </Label>
                </div>
              )}

              <Button 
                onClick={calculateProfitLoss} 
                className="w-full"
                disabled={!selectedIPO || (!lotSize && !shares)}
              >
                Calculate Profit/Loss
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {results.isProfit ? (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                  <span>Calculation Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">{results.ipoName}</h3>
                  <p className="text-sm text-gray-600">
                    {results.usedGMP ? 'Based on GMP' : 'Based on current market price'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Shares:</span>
                    <span className="font-medium">{results.totalShares}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Invested Amount:</span>
                    <span className="font-medium">₹{results.investedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value:</span>
                    <span className="font-medium">₹{results.currentValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Price/Share:</span>
                    <span className="font-medium">₹{results.currentPrice}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg">
                    <span className="font-medium">Profit/Loss:</span>
                    <span className={`font-bold ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.isProfit ? '+' : ''}₹{results.profitLoss.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Percentage:</span>
                    <span className={`font-medium ${results.isProfit ? 'text-green-600' : 'text-red-600'}`}>
                      {results.isProfit ? '+' : ''}{results.profitLossPercentage}%
                    </span>
                  </div>
                </div>

                {!results.isListed && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-yellow-800 text-sm">
                      <strong>Note:</strong> This IPO is not yet listed. Calculation is based on Grey Market Premium (GMP).
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>What is GMP?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Grey Market Premium (GMP) is the premium amount at which IPO shares are traded 
                in the grey market before listing. It indicates the expected listing price.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How to Use This Calculator?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Select the IPO you invested in</li>
                <li>• Enter number of lots or shares</li>
                <li>• Choose between GMP or market price</li>
                <li>• Get instant profit/loss calculation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Calculator;
