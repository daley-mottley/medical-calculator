import React, { useEffect, useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { Button } from '@/components/ui/button';
import { Save, Calculator, Trash2, Eye, Heart, Brain, Droplets } from 'lucide-react';
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
            <Card key={calculation.id} className="relative group shadow-lg border-medical-primary/20 hover:border-medical-primary transition-all">
              <CardHeader className="pb-2 flex flex-row items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-medical-primary/10">
                  {calculatorTypeIcons[calculation.calculatorType] || <Calculator className="text-medical-primary" />}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    {calculation.name || `${calculation.calculatorType} Calculation`}
                    <Badge variant="secondary" className="ml-2">
                      {calculation.calculatorType}
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Saved on: {new Date(calculation.timestamp).toLocaleString()}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="mb-2">
                  <span className="block text-xs font-semibold text-muted-foreground mb-1">Inputs</span>
                  {renderInputs(calculation.inputs)}
                </div>
                <div className="mb-2">
                  <span className="block text-xs font-semibold text-medical-primary mb-1">Results</span>
                  {renderResults(calculation.results)}
                </div>
                <div className="flex gap-2 mt-4">
                  <QuickActionButton icon={Eye} label="View" onClick={() => handleView(calculation)} />
                  <QuickActionButton icon={Trash2} label="Delete" onClick={() => handleDelete(calculation.id)} variant="outline" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default SavedCalculationsPage;
