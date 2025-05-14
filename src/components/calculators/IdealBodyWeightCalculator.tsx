import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const IdealBodyWeightCalculator: React.FC = () => {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [idealBodyWeight, setIdealBodyWeight] = useState<number | null>(null);

  const calculateIBW = () => {
    const feet = parseInt(heightFeet, 10);
    const inches = parseInt(heightInches, 10);

    if (isNaN(feet) || isNaN(inches) || gender === '') {
      setIdealBodyWeight(null);
      return;
    }

    const totalInches = (feet * 12) + inches;
    let ibw = 0;

    if (gender === 'male') {
      ibw = 50 + Math.max(0, (totalInches - 60) * 2.3);
    } else if (gender === 'female') {
      ibw = 45.5 + Math.max(0, (totalInches - 60) * 2.3);
    }

    setIdealBodyWeight(ibw);
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Ideal Body Weight Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height-feet">Height (Feet)</Label>
          <Input
            id="height-feet"
            type="number"
            value={heightFeet}
            onChange={(e) => setHeightFeet(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height-inches">Height (Inches)</Label>
          <Input
            id="height-inches"
            type="number"
            value={heightInches}
            onChange={(e) => setHeightInches(e.target.value)}
            placeholder="e.g., 10"
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
      </div>
      <Button onClick={calculateIBW}>Calculate IBW</Button>
      {idealBodyWeight !== null && (
        <div className="text-lg font-semibold">
          Ideal Body Weight: {idealBodyWeight.toFixed(2)} kg
        </div>
      )}
    </div>
  );
};

export default IdealBodyWeightCalculator;
