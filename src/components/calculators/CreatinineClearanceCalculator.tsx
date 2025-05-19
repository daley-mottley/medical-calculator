import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/components/ui/use-toast';

const CreatinineClearanceCalculator: React.FC = () => {
  const [serumCreatinine, setSerumCreatinine] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [sex, setSex] = useState<string>('male');
  const [creatinineClearance, setCreatinineClearance] = useState<number | null>(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const calculateCreatinineClearance = () => {
    const Scr = parseFloat(serumCreatinine);
    const Age = parseFloat(age);
    const Wt = parseFloat(weight);

    if (!isNaN(Scr) && !isNaN(Age) && !isNaN(Wt) && Scr > 0) {
      // Cockcroft-Gault Equation:
      // For males: ((140 - Age) * Wt) / (72 * Scr)
      // For females: ((140 - Age) * Wt) / (72 * Scr) * 0.85
      let result = ((140 - Age) * Wt) / (72 * Scr);
      if (sex === 'female') {
        result *= 0.85;
      }
      setCreatinineClearance(result);
    } else {
      setCreatinineClearance(null);
    }
  };

  const handleClear = () => {
    setSerumCreatinine('');
    setAge('');
    setWeight('');
    setSex('male');
    setCreatinineClearance(null);
  };

  const handleSaveCalculation = async () => {
    if (creatinineClearance === null) return;
    const calculationData = {
      calculatorType: 'Creatinine Clearance',
      inputs: { serumCreatinine, age, weight, sex },
      results: { creatinineClearance },
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your Creatinine Clearance calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Creatinine Clearance Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="serumCreatinine">Serum Creatinine (mg/dL)</Label>
            <Input
              id="serumCreatinine"
              type="number"
              value={serumCreatinine}
              onChange={(e) => setSerumCreatinine(e.target.value)}
              placeholder="Enter Serum Creatinine"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="age">Age (years)</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter Age"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter Weight"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sex">Sex</Label>
            <Select value={sex} onValueChange={setSex}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between gap-2">
            <Button onClick={calculateCreatinineClearance} className="flex-1">Calculate</Button>
            <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
          </div>
          {creatinineClearance !== null && (
            <div className="grid gap-2">
              <Label>Creatinine Clearance</Label>
              <div className="text-2xl font-bold">{creatinineClearance.toFixed(2)} mL/min</div>
              <Button onClick={handleSaveCalculation} className="w-full mt-3">Save Calculation</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatinineClearanceCalculator;
