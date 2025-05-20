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
        // Simulate a slight delay for animation visibility if API is too fast
        // await new Promise(resolve => setTimeout(resolve, 300)); 
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
    // For now, keep the alert. In a real scenario, this would navigate or show a modal.
    alert('Viewing details for: ' + (calculation.name || calculation.calculatorType) + '\nInputs: ' + JSON.stringify(calculation.inputs) + '\nResults: ' + JSON.stringify(calculation.results));
  };

  const handleDelete = async (id: string) => {
    // Optimistically update UI
    setSavedCalculations(prev => prev.filter(calc => calc.id !== id));
    try {
      // TODO: Uncomment when backend delete endpoint is implemented
      // await apiClient.delete(`/api/saved-calculations/${id}`);
      console.log(`Mock delete successful for ID: ${id}`);
    } catch (err) {
      console.error('Failed to delete calculation:', err);
      // TODO: Revert optimistic update and show error to user
      // setError('Failed to delete calculation. Please try again.');
      // Optionally refetch or add the item back if deletion fails
    }
  };

  const renderStructuredData = (data: any, type: 'inputs' | 'results') => {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return <p className="text-xs text-muted-foreground">No {type} data available.</p>;
    }
    return (
      <dl className="text-xs space-y-1">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex">
            <dt className="font-medium capitalize text-muted-foreground w-2/5 truncate pr-1">{key.replace(/([A-Z])/g, ' $1').trim()}:</dt>
            <dd className={`w-3/5 ${type === 'results' ? 'text-medical-primary font-semibold' : 'text-foreground'}`}>{String(value)}</dd>
          </div>
        ))}
      </dl>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        {/* Consider a more engaging loading skeleton here */}
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary"></div>
          <p className="ml-3 text-muted-foreground">Loading saved calculations...</p>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded-md">{error}</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Saved Calculations</h1>
        <p className="text-muted-foreground mt-1">
          Review your previously saved medical calculation results.
        </p>
      </div>

      {savedCalculations.length === 0 ? (
        <Card className="mx-auto max-w-lg animate-fade-in animate-scale-in shadow-xl border-medical-primary/30 bg-gradient-to-br from-medical-soft/30 to-background">
          <CardContent className="p-10 text-center flex flex-col items-center">
            <Save className="mx-auto h-16 w-16 text-medical-primary mb-5 animate-pulse-gentle" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">No Saved Calculations Yet</h3>
            <p className="text-muted-foreground my-4 text-sm">
              Calculations you save from any of our medical calculators will appear here for easy access.
            </p>
            <Button className="mt-4 bg-medical-primary hover:bg-medical-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300" onClick={() => navigate('/calculators')}>
              Explore Calculators
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in">
          {savedCalculations.map((calculation, index) => (
            <Card 
              key={calculation.id} 
              className="relative group shadow-lg border border-medical-primary/20 hover:border-medical-accent hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out bg-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }} // Staggered animation
            >
              <CardHeader className="pb-3 flex flex-row items-start gap-3">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-medical-primary/10 shrink-0 mt-1">
                  {calculatorTypeIcons[calculation.calculatorType] || <Calculator className="text-medical-primary h-6 w-6" />}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold flex items-center justify-between">
                    <span className="truncate pr-2">{calculation.name || `${calculation.calculatorType} Calculation`}</span>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap shrink-0">
                      {calculation.calculatorType}
                    </Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Saved: {new Date(calculation.timestamp).toLocaleDateString()} ({new Date(calculation.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4 space-y-3">
                <div>
                  <h4 className="text-xs font-semibold text-muted-foreground mb-1.5 tracking-wider uppercase">Inputs</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-md shadow-inner">
                    {renderStructuredData(calculation.inputs, 'inputs')}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-medical-primary mb-1.5 tracking-wider uppercase">Results</h4>
                  <div className="bg-medical-soft/20 dark:bg-medical-primary/10 p-2.5 rounded-md shadow-inner">
                    {renderStructuredData(calculation.results, 'results')}
                  </div>
                </div>
                <div className="flex gap-2 pt-2 justify-end">
                  <QuickActionButton icon={Eye} label="View" onClick={() => handleView(calculation)} className="text-xs" />
                  <QuickActionButton 
                    icon={Trash2} 
                    label="Delete" 
                    onClick={() => handleDelete(calculation.id)} 
                    variant="outline"
                    className="text-xs border-red-400/50 text-red-600 dark:text-red-500 dark:border-red-600/50 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-400 hover:border-red-500 dark:hover:border-red-500"
                  />
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
