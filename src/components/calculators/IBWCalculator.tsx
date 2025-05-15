import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const IBWCalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [weight, setWeight] = useState(''); // Needed for Adjusted Body Weight
  const [ibw, setIbw] = useState<string | null>(null);
  const [abw, setAbw] = useState<string | null>(null);

  const calculateIBWAndABW = () => {
    const h = parseFloat(height); // Assuming height in inches
    const w = parseFloat(weight); // Assuming weight in kg

    if (isNaN(h) || h <= 0 || gender === '') {
      setIbw('Invalid input');
      setAbw('Invalid input');
      return;
    }

    let calculatedIbw: number;
    // Devine formula for IBW
    if (gender === 'male') {
      calculatedIbw = 50 + 2.3 * Math.max(0, h - 60); // Height in inches
    } else { // female
      calculatedIbw = 45.5 + 2.3 * Math.max(0, h - 60); // Height in inches
    }

    setIbw(calculatedIbw.toFixed(2) + ' kg');

    // Calculate Adjusted Body Weight if current weight is provided and is greater than IBW
    if (!isNaN(w) && w > 0) {
        const calculatedAbw = calculatedIbw + 0.4 * (w - calculatedIbw);
        setAbw(calculatedAbw.toFixed(2) + ' kg');
    } else {
        setAbw('N/A (Current weight needed)');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ideal and Adjusted Body Weight (IBW & ABW) Calculator</CardTitle>
        <CardDescription>Calculate Ideal and Adjusted Body Weight using the Devine formula.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (inches)</Label>
          <Input
            id="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in inches"
          />
        </div>
        <div className="space-y-2">
           <Label htmlFor="gender">Gender</Label>
           <Select onValueChange={(value: 'male' | 'female') => setGender(value)}>
             <SelectTrigger id="gender">
               <SelectValue placeholder="Select gender" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="male">Male</SelectItem>
               <SelectItem value="female">Female</SelectItem>
             </SelectContent>
           </Select>
        </div>
         <div className="space-y-2">
          <Label htmlFor="weight">Current Weight (kg) - Optional for ABW</Label>
          <Input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter current weight in kg"
          />
        </div>
        <Button onClick={calculateIBWAndABW} className="w-full bg-medical-primary hover:bg-medical-secondary">Calculate</Button>
        {(ibw !== null || abw !== null) && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Calculation Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ibw !== null && <p className="text-lg font-semibold text-vivid-purple">Ideal Body Weight (IBW): {ibw}</p>}
              {abw !== null && <p className="text-lg font-semibold text-vivid-purple">Adjusted Body Weight (ABW): {abw}</p>}
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
