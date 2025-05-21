import React, { useEffect, useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { Button } from '@/components/ui/button';
import { Save, Calculator, Trash2, Eye, Heart, Brain, Droplets, Clipboard } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';

interface SavedCalculation {
  id: string;
  calculatorType: string;
  inputs: any;
  results: any;
  timestamp: string;
  name?: string;
}

const calculatorTypeIcons: Record<string, React.ReactNode> = {
  'BMI': <Calculator className="text-medical-primary" />,
  'HAS-BLED': <Heart className="text-medical-primary" />,
  'CHA₂DS₂-VASc': <Brain className="text-medical-primary" />,
  'eGFR': <Droplets className="text-medical-primary" />,
  'Creatinine Clearance': <Droplets className="text-medical-primary" />,
  // Add more mappings as needed
};

const SavedCalculationsPage = () => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedCalculations = async () => {
      try {
        const response = await apiClient.get('/api/saved-calculations');
        setSavedCalculations(response.data);
      } catch (err) {
        setError('Failed to fetch saved calculations.');
        console.error('Error fetching saved calculations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCalculations();
  }, []);

  const handleView = (calculation: SavedCalculation) => {
    // Optionally implement detailed view modal or navigation
    alert('View details for: ' + (calculation.name || calculation.calculatorType));
  };

  const handleDelete = async (id: string) => {
    // Optionally implement delete logic (update backend and state)
    const filtered = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(filtered);
    // TODO: Call backend to delete
    // await apiClient.delete(`/api/saved-calculations/${id}`);
  };

  const handleCopy = (calculation: SavedCalculation) => {
    const summary = `Calculation: ${calculation.name || calculation.calculatorType}\n` +
      `Type: ${calculation.calculatorType}\n` +
      `Saved on: ${new Date(calculation.timestamp).toLocaleString()}\n` +
      `Inputs: ${JSON.stringify(calculation.inputs, null, 2)}\n` +
      `Results: ${JSON.stringify(calculation.results, null, 2)}`;
    navigator.clipboard.writeText(summary);
    alert('Calculation copied to clipboard!'); // Replace with toast if available
  };

  const renderInputs = (inputs: any) => {
    if (!inputs || typeof inputs !== 'object') return null;
    return (
      <ul className="text-xs text-muted-foreground space-y-1">
        {Object.entries(inputs).map(([key, value]) => (
          <li key={key}><span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>: {String(value)}</li>
        ))}
      </ul>
    );
  };

  const renderResults = (results: any) => {
    if (!results || typeof results !== 'object') return null;
    return (
      <ul className="text-xs text-medical-primary space-y-1">
        {Object.entries(results).map(([key, value]) => (
          <li key={key}><span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>: {String(value)}</li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        <div>Loading saved calculations...</div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        <div className="text-red-500">{error}</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        <p className="text-muted-foreground">
          Your previously saved medical calculation results.
        </p>
      </div>

      {savedCalculations.length === 0 ? (
        <Card className="mx-auto max-w-md">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <Save className="mx-auto h-12 w-12 text-medical-primary mb-3" />
            <h3 className="text-xl font-medium">No saved calculations yet</h3>
            <p className="text-muted-foreground my-3">
              Save calculations from the calculator pages to see them here.
            </p>
            <Button className="mt-2" onClick={() => navigate('/calculators')}>
              Browse Calculators
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {savedCalculations.map((calculation) => (
            <Card key={calculation.id} className="relative group shadow-xl border-0 rounded-2xl bg-white hover:shadow-2xl transition-all p-0 overflow-hidden">
              <div className="flex flex-col h-full">
                {/* Top section: Icon and header */}
                <div className="flex items-center gap-4 px-6 pt-6 pb-2">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-medical-primary/20 shadow-inner">
                    {calculatorTypeIcons[calculation.calculatorType] || <Calculator className="text-medical-primary w-8 h-8" />}
                </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-bold truncate">{calculation.name || `${calculation.calculatorType} Calculation`}</span>
                      <Badge variant="secondary" className="ml-1 text-xs px-2 py-0.5 rounded-full bg-medical-primary/10 text-medical-primary font-semibold">
                      {calculation.calculatorType}
                    </Badge>
                    </div>
                    <span className="block text-xs text-muted-foreground mt-1">{new Date(calculation.timestamp).toLocaleString()}</span>
                  </div>
                </div>
                {/* Divider */}
                <div className="border-t border-light-gray my-2 mx-6" />
                {/* Inputs and Results */}
                <div className="flex-1 px-6 pb-2">
                  <div className="mb-3">
                  <span className="block text-xs font-semibold text-muted-foreground mb-1">Inputs</span>
                    <div className="bg-light-gray/60 rounded-lg px-3 py-2">
                  {renderInputs(calculation.inputs)}
                </div>
                  </div>
                  <div>
                  <span className="block text-xs font-semibold text-medical-primary mb-1">Results</span>
                    <div className="bg-medical-primary/10 rounded-lg px-3 py-2">
                  {renderResults(calculation.results)}
                    </div>
                  </div>
                </div>
                {/* Quick actions */}
                <div className="flex gap-3 px-6 pb-5 pt-2 mt-auto border-t border-light-gray bg-light-gray/40">
                  <QuickActionButton icon={Eye} label="View" onClick={() => handleView(calculation)} className="flex-1 hover:bg-medical-primary/10 transition" />
                  <QuickActionButton icon={Clipboard} label="Copy" onClick={() => handleCopy(calculation)} className="flex-1 hover:bg-medical-primary/10 transition" />
                  <QuickActionButton icon={Trash2} label="Delete" onClick={() => handleDelete(calculation.id)} variant="outline" className="flex-1 hover:bg-alert-red/10 transition" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default SavedCalculationsPage;
