import React, { useEffect, useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiClient } from '@/lib/apiClient'; // Assuming apiClient is used for backend calls

interface SavedCalculation {
  id: string;
  calculatorType: string;
  inputs: any; // Define a more specific type later
  results: any; // Define a more specific type later
  timestamp: string;
  name?: string; // Optional name for the saved calculation
}

const SavedCalculationsPage = () => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedCalculations = async () => {
      try {
        // TODO: Replace with actual API endpoint for fetching saved calculations
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
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-medium">No saved calculations yet</h3>
            <p className="text-muted-foreground my-3">
              Save calculations from the calculator pages to see them here.
            </p>
            {/* TODO: Add a button to navigate back to calculators */}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedCalculations.map((calculation) => (
            <Card key={calculation.id}>
              <CardHeader>
                <CardTitle>{calculation.name || `${calculation.calculatorType} Calculation`}</CardTitle>
                <p className="text-sm text-muted-foreground">Saved on: {new Date(calculation.timestamp).toLocaleString()}</p>
              </CardHeader>
              <CardContent>
                {/* TODO: Display calculation inputs and results */}
                <p>Inputs: {JSON.stringify(calculation.inputs)}</p>
                <p>Results: {JSON.stringify(calculation.results)}</p>
                {/* TODO: Add a button to view details or load calculation */}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default SavedCalculationsPage;
