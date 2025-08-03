
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search,
  Calendar,
  TrendingUp,
  FileText,
  Save,
  X
} from 'lucide-react';

const IPOManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Mainboard',
    status: 'Upcoming',
    priceRange: '',
    openDate: '',
    closeDate: '',
    allotmentDate: '',
    issueSize: '',
    minInvestment: '',
    lotSize: '',
    about: '',
    strengths: '',
    weaknesses: '',
    applicationDetails: '',
    faqs: '',
    sector: '',
    quotaCategories: [] as string[],
    parentCompany: '',
    shareholderDeadline: ''
  });

  const quotaOptions = [
    'Retail (RII)',
    'Non-Institutional / HNI', 
    'QIB',
    'Shareholder Quota',
    'Employee'
  ];

  // Mock data with enhanced fields
  const [ipos, setIpos] = useState([
    {
      id: '1',
      name: 'Tech Solutions Ltd',
      type: 'Mainboard',
      status: 'Open',
      priceRange: '₹100-120',
      openDate: '2024-01-15',
      closeDate: '2024-01-17',
      allotmentDate: '2024-01-20',
      issueSize: '₹500 Cr',
      minInvestment: '₹12,500',
      lotSize: '125',
      about: 'Leading technology solutions provider',
      strengths: 'Strong market position, experienced management',
      weaknesses: 'High debt levels, intense competition',
      applicationDetails: 'Apply through ASBA, UPI payments accepted',
      faqs: 'Check allotment status on registrar website',
      sector: 'Technology',
      quotaCategories: ['Retail (RII)', 'QIB', 'Non-Institutional / HNI'],
      parentCompany: '',
      shareholderDeadline: ''
    },
    {
      id: '2',
      name: 'Green Energy Corp',
      type: 'SME',
      status: 'Upcoming',
      priceRange: '₹50-60',
      openDate: '2024-01-20',
      closeDate: '2024-01-22',
      allotmentDate: '2024-01-25',
      issueSize: '₹100 Cr',
      minInvestment: '₹10,000',
      lotSize: '200',
      about: 'Renewable energy solutions company',
      strengths: 'Growing market, government support',
      weaknesses: 'Capital intensive, weather dependent',
      applicationDetails: 'Online application through brokers',
      faqs: 'Minimum application is 1 lot',
      sector: 'Renewable Energy',
      quotaCategories: ['Retail (RII)', 'Shareholder Quota'],
      parentCompany: 'Green Holdings Ltd',
      shareholderDeadline: '2024-01-10'
    }
  ]);

  // Auto calculate min investment
  React.useEffect(() => {
    if (formData.priceRange && formData.lotSize) {
      const priceMatch = formData.priceRange.match(/₹?(\d+)/);
      if (priceMatch && formData.lotSize) {
        const lowPrice = parseInt(priceMatch[1]);
        const lotSize = parseInt(formData.lotSize);
        const minInvestment = lowPrice * lotSize;
        setFormData(prev => ({
          ...prev,
          minInvestment: `₹${minInvestment.toLocaleString()}`
        }));
      }
    }
  }, [formData.priceRange, formData.lotSize]);

  const filteredIPOs = ipos.filter(ipo =>
    ipo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEdit = (ipo: any) => {
    setEditingId(ipo.id);
    setFormData({
      name: ipo.name,
      type: ipo.type,
      status: ipo.status,
      priceRange: ipo.priceRange,
      openDate: ipo.openDate,
      closeDate: ipo.closeDate,
      allotmentDate: ipo.allotmentDate,
      issueSize: ipo.issueSize,
      minInvestment: ipo.minInvestment,
      lotSize: ipo.lotSize,
      about: ipo.about,
      strengths: ipo.strengths,
      weaknesses: ipo.weaknesses,
      applicationDetails: ipo.applicationDetails,
      faqs: ipo.faqs,
      sector: ipo.sector || '',
      quotaCategories: ipo.quotaCategories || [],
      parentCompany: ipo.parentCompany || '',
      shareholderDeadline: ipo.shareholderDeadline || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this IPO?')) {
      setIpos(prev => prev.filter(ipo => ipo.id !== id));
    }
  };

  const handleSave = () => {
    const newIPO = {
      id: editingId || Date.now().toString(),
      ...formData
    };

    if (editingId) {
      setIpos(prev => prev.map(ipo => ipo.id === editingId ? newIPO : ipo));
    } else {
      setIpos(prev => [...prev, newIPO]);
    }

    handleCancel();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      type: 'Mainboard',
      status: 'Upcoming',
      priceRange: '',
      openDate: '',
      closeDate: '',
      allotmentDate: '',
      issueSize: '',
      minInvestment: '',
      lotSize: '',
      about: '',
      strengths: '',
      weaknesses: '',
      applicationDetails: '',
      faqs: '',
      sector: '',
      quotaCategories: [],
      parentCompany: '',
      shareholderDeadline: ''
    });
  };

  const handleQuotaChange = (quota: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        quotaCategories: [...prev.quotaCategories, quota]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        quotaCategories: prev.quotaCategories.filter(q => q !== quota)
      }));
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
          IPO Management
        </h2>
        <Button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
        >
          <PlusCircle className="h-4 w-4" />
          Add New IPO
        </Button>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle className="text-gray-800">All IPOs</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search IPOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredIPOs.map((ipo) => (
              <div key={ipo.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-r from-blue-50/30 to-green-50/30">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{ipo.name}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2 text-sm text-gray-600">
                      <span>Type: {ipo.type}</span>
                      <span>Price: {ipo.priceRange}</span>
                      <span>Size: {ipo.issueSize}</span>
                      <span>Lot Size: {ipo.lotSize}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1 text-sm text-gray-600">
                      <span>Sector: {ipo.sector}</span>
                      <span>Min Investment: {ipo.minInvestment}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{ipo.openDate} to {ipo.closeDate}</span>
                    </div>
                    {ipo.quotaCategories && ipo.quotaCategories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ipo.quotaCategories.map(quota => (
                          <Badge key={quota} variant="outline" className="text-xs">
                            {quota}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(ipo.status)}>
                      {ipo.status}
                    </Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(ipo)}
                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(ipo.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {showAddForm && (
        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
            <CardTitle className="text-gray-800">{editingId ? 'Edit IPO' : 'Add New IPO'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">IPO Name</Label>
                <Input 
                  id="name" 
                  placeholder="Enter IPO name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-gray-700">Type</Label>
                <select 
                  id="type" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Mainboard">Mainboard</option>
                  <option value="SME">SME</option>
                </select>
              </div>
              <div>
                <Label htmlFor="sector" className="text-gray-700">Sector</Label>
                <Input 
                  id="sector" 
                  placeholder="e.g., Technology, Healthcare" 
                  value={formData.sector}
                  onChange={(e) => setFormData({...formData, sector: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-700">Status</Label>
                <select 
                  id="status" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <Label htmlFor="priceRange" className="text-gray-700">Price Range</Label>
                <Input 
                  id="priceRange" 
                  placeholder="₹100-120" 
                  value={formData.priceRange}
                  onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="lotSize" className="text-gray-700">Lot Size</Label>
                <Input 
                  id="lotSize" 
                  placeholder="125" 
                  value={formData.lotSize}
                  onChange={(e) => setFormData({...formData, lotSize: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="minInvestment" className="text-gray-700">Min Investment (Auto-calculated)</Label>
                <Input 
                  id="minInvestment" 
                  value={formData.minInvestment}
                  readOnly
                  className="border-gray-300 bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="issueSize" className="text-gray-700">Issue Size</Label>
                <Input 
                  id="issueSize" 
                  placeholder="₹500 Cr" 
                  value={formData.issueSize}
                  onChange={(e) => setFormData({...formData, issueSize: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="openDate" className="text-gray-700">Open Date</Label>
                <Input 
                  id="openDate" 
                  type="date" 
                  value={formData.openDate}
                  onChange={(e) => setFormData({...formData, openDate: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="closeDate" className="text-gray-700">Close Date</Label>
                <Input 
                  id="closeDate" 
                  type="date" 
                  value={formData.closeDate}
                  onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="allotmentDate" className="text-gray-700">Allotment Date</Label>
                <Input 
                  id="allotmentDate" 
                  type="date" 
                  value={formData.allotmentDate}
                  onChange={(e) => setFormData({...formData, allotmentDate: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Quota Categories */}
            <div className="mt-4">
              <Label className="text-gray-700">Quota Categories (Multi-select)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {quotaOptions.map(quota => (
                  <div key={quota} className="flex items-center space-x-2">
                    <Checkbox 
                      id={quota}
                      checked={formData.quotaCategories.includes(quota)}
                      onCheckedChange={(checked) => handleQuotaChange(quota, checked as boolean)}
                    />
                    <Label htmlFor={quota} className="text-sm text-gray-700">{quota}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Shareholder Quota Fields */}
            {formData.quotaCategories.includes('Shareholder Quota') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-blue-50 rounded-lg">
                <div>
                  <Label htmlFor="parentCompany" className="text-gray-700">Parent Company Name</Label>
                  <Input 
                    id="parentCompany" 
                    placeholder="Enter parent company name" 
                    value={formData.parentCompany}
                    onChange={(e) => setFormData({...formData, parentCompany: e.target.value})}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
                <div>
                  <Label htmlFor="shareholderDeadline" className="text-gray-700">Shareholder Criteria Deadline</Label>
                  <Input 
                    id="shareholderDeadline" 
                    type="date" 
                    value={formData.shareholderDeadline}
                    onChange={(e) => setFormData({...formData, shareholderDeadline: e.target.value})}
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Text Areas */}
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <Label htmlFor="about" className="text-gray-700">About IPO</Label>
                <Textarea 
                  id="about" 
                  placeholder="Enter IPO description" 
                  value={formData.about}
                  onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="strengths" className="text-gray-700">Strengths & Financials</Label>
                <Textarea 
                  id="strengths" 
                  placeholder="Enter strengths and financial highlights" 
                  value={formData.strengths}
                  onChange={(e) => setFormData({...formData, strengths: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="weaknesses" className="text-gray-700">Weaknesses</Label>
                <Textarea 
                  id="weaknesses" 
                  placeholder="Enter weaknesses and risks" 
                  value={formData.weaknesses}
                  onChange={(e) => setFormData({...formData, weaknesses: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="applicationDetails" className="text-gray-700">Application Details</Label>
                <Textarea 
                  id="applicationDetails" 
                  placeholder="Enter application process details" 
                  value={formData.applicationDetails}
                  onChange={(e) => setFormData({...formData, applicationDetails: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
              <div>
                <Label htmlFor="faqs" className="text-gray-700">Top FAQs</Label>
                <Textarea 
                  id="faqs" 
                  placeholder="Enter frequently asked questions" 
                  value={formData.faqs}
                  onChange={(e) => setFormData({...formData, faqs: e.target.value})}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-6">
              <Button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600"
              >
                <Save className="h-4 w-4" />
                {editingId ? 'Update IPO' : 'Save IPO'}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IPOManagement;
