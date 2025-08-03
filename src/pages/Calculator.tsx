
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIChatbot from '@/components/AIChatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator as CalcIcon, 
  TrendingUp, 
  DollarSign, 
  PiggyBank,
  CreditCard,
  BarChart3,
  Target
} from 'lucide-react';

const Calculator = () => {
  const [activeCalculator, setActiveCalculator] = useState('sip');
  
  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState('5000');
  const [sipRate, setSipRate] = useState('12');
  const [sipYears, setSipYears] = useState('10');
  const [sipResult, setSipResult] = useState<any>(null);

  // SWP Calculator State
  const [swpInvestment, setSwpInvestment] = useState('1000000');
  const [swpWithdrawal, setSwpWithdrawal] = useState('10000');
  const [swpRate, setSwpRate] = useState('10');
  const [swpResult, setSwpResult] = useState<any>(null);

  // FD Calculator State
  const [fdAmount, setFdAmount] = useState('100000');
  const [fdRate, setFdRate] = useState('6.5');
  const [fdYears, setFdYears] = useState('5');
  const [fdResult, setFdResult] = useState<any>(null);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState('2500000');
  const [loanRate, setLoanRate] = useState('8.5');
  const [loanYears, setLoanYears] = useState('20');
  const [emiResult, setEmiResult] = useState<any>(null);

  const calculateSIP = () => {
    const P = parseFloat(sipAmount);
    const r = parseFloat(sipRate) / 12 / 100;
    const n = parseFloat(sipYears) * 12;
    
    const futureValue = P * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
    const totalInvested = P * n;
    const returns = futureValue - totalInvested;
    
    setSipResult({
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      returns: Math.round(returns)
    });
  };

  const calculateSWP = () => {
    const principal = parseFloat(swpInvestment);
    const withdrawal = parseFloat(swpWithdrawal);
    const rate = parseFloat(swpRate) / 12 / 100;
    
    // Simplified calculation for demonstration
    const monthsLasting = Math.log(1 - (withdrawal * (1 / rate)) / principal) / Math.log(1 + rate);
    const yearsLasting = Math.abs(monthsLasting) / 12;
    
    setSwpResult({
      monthsLasting: Math.round(Math.abs(monthsLasting)),
      yearsLasting: Math.round(yearsLasting * 10) / 10,
      totalWithdrawal: withdrawal * Math.abs(monthsLasting)
    });
  };

  const calculateFD = () => {
    const P = parseFloat(fdAmount);
    const r = parseFloat(fdRate) / 100;
    const t = parseFloat(fdYears);
    
    const maturityAmount = P * Math.pow((1 + r / 4), 4 * t); // Quarterly compounding
    const interest = maturityAmount - P;
    
    setFdResult({
      maturityAmount: Math.round(maturityAmount),
      interest: Math.round(interest),
      totalDeposit: P
    });
  };

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(loanRate) / 12 / 100;
    const n = parseFloat(loanYears) * 12;
    
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;
    
    setEmiResult({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest)
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plan your investments and financial goals with our comprehensive suite of calculators. 
            Make informed decisions about SIP, SWP, FD, loans, and more.
          </p>
        </div>

        <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 mb-8">
            <TabsTrigger value="sip" className="text-xs sm:text-sm">SIP</TabsTrigger>
            <TabsTrigger value="swp" className="text-xs sm:text-sm">SWP</TabsTrigger>
            <TabsTrigger value="stepup" className="text-xs sm:text-sm">Step-up SIP</TabsTrigger>
            <TabsTrigger value="fd" className="text-xs sm:text-sm">FD</TabsTrigger>
            <TabsTrigger value="rd" className="text-xs sm:text-sm">RD</TabsTrigger>
            <TabsTrigger value="emi" className="text-xs sm:text-sm">EMI</TabsTrigger>
            <TabsTrigger value="mutual" className="text-xs sm:text-sm">Mutual Fund</TabsTrigger>
          </TabsList>

          {/* SIP Calculator */}
          <TabsContent value="sip">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    SIP Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                    <Input
                      id="sipAmount"
                      type="number"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sipRate">Expected Annual Return (%)</Label>
                    <Input
                      id="sipRate"
                      type="number"
                      step="0.1"
                      value={sipRate}
                      onChange={(e) => setSipRate(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sipYears">Investment Period (Years)</Label>
                    <Input
                      id="sipYears"
                      type="number"
                      value={sipYears}
                      onChange={(e) => setSipYears(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <Button onClick={calculateSIP} className="w-full">
                    Calculate SIP
                  </Button>
                </CardContent>
              </Card>

              {sipResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>SIP Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Future Value</div>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(sipResult.futureValue)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Invested</div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(sipResult.totalInvested)}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Estimated Returns</div>
                        <div className="text-xl font-bold text-purple-600">
                          {formatCurrency(sipResult.returns)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* SWP Calculator */}
          <TabsContent value="swp">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    SWP Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="swpInvestment">Total Investment (₹)</Label>
                    <Input
                      id="swpInvestment"
                      type="number"
                      value={swpInvestment}
                      onChange={(e) => setSwpInvestment(e.target.value)}
                      placeholder="1000000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="swpWithdrawal">Monthly Withdrawal (₹)</Label>
                    <Input
                      id="swpWithdrawal"
                      type="number"
                      value={swpWithdrawal}
                      onChange={(e) => setSwpWithdrawal(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="swpRate">Expected Annual Return (%)</Label>
                    <Input
                      id="swpRate"
                      type="number"
                      step="0.1"
                      value={swpRate}
                      onChange={(e) => setSwpRate(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <Button onClick={calculateSWP} className="w-full">
                    Calculate SWP
                  </Button>
                </CardContent>
              </Card>

              {swpResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>SWP Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Investment Will Last</div>
                        <div className="text-2xl font-bold text-green-600">
                          {swpResult.yearsLasting} Years
                        </div>
                        <div className="text-sm text-gray-500">
                          ({swpResult.monthsLasting} months)
                        </div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Withdrawal</div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatCurrency(swpResult.totalWithdrawal)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* FD Calculator */}
          <TabsContent value="fd">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-orange-600" />
                    Fixed Deposit Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fdAmount">Deposit Amount (₹)</Label>
                    <Input
                      id="fdAmount"
                      type="number"
                      value={fdAmount}
                      onChange={(e) => setFdAmount(e.target.value)}
                      placeholder="100000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fdRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="fdRate"
                      type="number"
                      step="0.1"
                      value={fdRate}
                      onChange={(e) => setFdRate(e.target.value)}
                      placeholder="6.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fdYears">Investment Period (Years)</Label>
                    <Input
                      id="fdYears"
                      type="number"
                      value={fdYears}
                      onChange={(e) => setFdYears(e.target.value)}
                      placeholder="5"
                    />
                  </div>
                  <Button onClick={calculateFD} className="w-full">
                    Calculate FD
                  </Button>
                </CardContent>
              </Card>

              {fdResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>FD Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Maturity Amount</div>
                        <div className="text-2xl font-bold text-orange-600">
                          {formatCurrency(fdResult.maturityAmount)}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Interest Earned</div>
                        <div className="text-xl font-bold text-green-600">
                          {formatCurrency(fdResult.interest)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* EMI Calculator */}
          <TabsContent value="emi">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-red-600" />
                    EMI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="2500000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="loanRate"
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(e.target.value)}
                      placeholder="8.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="loanYears">Loan Tenure (Years)</Label>
                    <Input
                      id="loanYears"
                      type="number"
                      value={loanYears}
                      onChange={(e) => setLoanYears(e.target.value)}
                      placeholder="20"
                    />
                  </div>
                  <Button onClick={calculateEMI} className="w-full">
                    Calculate EMI
                  </Button>
                </CardContent>
              </Card>

              {emiResult && (
                <Card>
                  <CardHeader>
                    <CardTitle>EMI Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Monthly EMI</div>
                        <div className="text-2xl font-bold text-red-600">
                          {formatCurrency(emiResult.emi)}
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Payment</div>
                        <div className="text-xl font-bold text-orange-600">
                          {formatCurrency(emiResult.totalPayment)}
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-gray-600">Total Interest</div>
                        <div className="text-xl font-bold text-purple-600">
                          {formatCurrency(emiResult.totalInterest)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Placeholder tabs for other calculators */}
          <TabsContent value="stepup">
            <Card>
              <CardHeader>
                <CardTitle>Step-up SIP Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Step-up SIP calculator coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rd">
            <Card>
              <CardHeader>
                <CardTitle>Recurring Deposit Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">RD calculator coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mutual">
            <Card>
              <CardHeader>
                <CardTitle>Mutual Fund Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Mutual fund calculator coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Calculator;
