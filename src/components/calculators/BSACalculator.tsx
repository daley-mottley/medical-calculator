import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const BSACalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bsa, setBsa] = useState<string | null>(null);

  const calculateBSA = () => {
    // Placeholder for BSA calculation logic
    // Common formulas include DuBois, Mosteller, Haycock, etc.
    // For demonstration, let's use the Mosteller formula: BSA (m^2) = sqrt( [Height(cm) * Weight(kg)] / 3600 )
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (isNaN(h) || isNaN(w) || h <= 0 || w <= 0) {
      setBsa('Invalid input');
      return;
    }

    // Assuming height is in cm and weight is in kg
    const calculatedBsa = Math.sqrt((h * w) / 3600);
    setBsa(calculatedBsa.toFixed(2) + ' m²');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Body Surface Area (BSA) Calculator</CardTitle>
        <CardDescription>Calculate Body Surface Area using the Mosteller formula.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        <Button onClick={calculateBSA} className="w-full bg-medical-primary hover:bg-medical-secondary">Calculate BSA</Button>
        {bsa !== null && (
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-medium text-sm mb-2">Result</h4>
            <p>{bsa}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
