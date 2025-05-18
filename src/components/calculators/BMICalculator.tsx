import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/components/ui/use-toast';

export function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const calculateBMI = () => {
    const weightKg = parseFloat(weight);
    const heightM = parseFloat(height) / 100; // assuming height is in cm

    if (isNaN(weightKg) || isNaN(heightM) || heightM === 0) {
      setBmi(null);
      setCategory(null);
      return;
    }

    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setCategory('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setCategory('Normal weight');
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  };

  const handleSaveCalculation = async () => {
    if (bmi === null || !weight || !height) return;
    const calculationData = {
      calculatorType: 'BMI',
      inputs: { weight, height },
      results: { bmi, category },
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your BMI calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>BMI Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <Button onClick={calculateBMI} className="w-full">Calculate BMI</Button>
        {bmi !== null && (
          <div className="mt-4 space-y-2">
            <h3 className="text-lg font-medium">Result:</h3>
            <p>BMI: {bmi.toFixed(2)}</p>
            <p>Category: {category}</p>
            <Button onClick={handleSaveCalculation} className="w-full">Save Calculation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
