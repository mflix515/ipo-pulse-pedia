
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, UserPlus } from 'lucide-react';

const JoinUsSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    panCard: '',
    city: '',
    message: '',
    marketingConsent: false,
    termsAccepted: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be connected to Supabase later
    console.log('Form data:', formData);
    alert('Thank you for joining us! We will contact you soon.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 bg-gradient-green-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-6">
            <UserPlus className="h-8 w-8" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Us on the Journey to Success
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get exclusive IPO insights, early alerts, and personalized investment guidance. 
            Join thousands of successful investors who trust IPO-Pedia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Benefits */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Join IPO-Pedia?</h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Exclusive Email Alerts</h4>
                  <p className="text-gray-600">Get notified about hot IPOs before they open, with detailed analysis and GMP updates.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">SMS Notifications</h4>
                  <p className="text-gray-600">Instant updates on IPO openings, closings, and listing dates directly to your phone.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personalized Content</h4>
                  <p className="text-gray-600">Tailored IPO recommendations based on your location and investment preferences.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-l-green-500">
              <h4 className="font-bold text-gray-900 mb-2">🎯 Success Stories</h4>
              <p className="text-gray-600 text-sm">
                "Thanks to IPO-Pedia's alerts, I made 180% profit on my last IPO investment!" - Rahul S., Mumbai
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="shadow-2xl border-0">
            <CardHeader className="bg-green-600 text-white rounded-t-lg">
              <CardTitle className="text-center text-xl">Start Your Success Journey</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="10-digit mobile number"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email ID *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="panCard" className="text-sm font-medium text-gray-700">PAN Card Number</Label>
                    <Input
                      id="panCard"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="ABCDE1234F (Optional)"
                      pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-gray-700">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1"
                      placeholder="Your city"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Tell us about your investment goals (optional)"
                    rows={3}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={formData.marketingConsent}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, marketingConsent: !!checked }))
                      }
                    />
                    <Label htmlFor="marketing" className="text-sm text-gray-600">
                      I agree to receive marketing and promotional emails/SMS
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, termsAccepted: !!checked }))
                      }
                      required
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-600">
                      I have read and agree to the <a href="/terms" className="text-green-600 hover:underline">Terms & Conditions</a> *
                    </Label>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  disabled={!formData.termsAccepted}
                >
                  Join IPO-Pedia Today
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
