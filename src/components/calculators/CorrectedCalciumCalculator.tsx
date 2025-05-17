import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const CorrectedCalciumCalculator: React.FC = () => {
  const [serumCalcium, setSerumCalcium] = useState<string>('');
  const [albumin, setAlbumin] = useState<string>('');
  const [correctedCalcium, setCorrectedCalcium] = useState<number | null>(null);

  const calculateCorrectedCalcium = () => {
    const Ca = parseFloat(serumCalcium);
    const Alb = parseFloat(albumin);

    if (!isNaN(Ca) && !isNaN(Alb)) {
      // Formula: Corrected Calcium = Serum Calcium + 0.8 * (4.0 - Albumin)
      const result = Ca + 0.8 * (4.0 - Alb);
      setCorrectedCalcium(result);
    } else {
      setCorrectedCalcium(null);
    }
  };

  const handleClear = () => {
    setSerumCalcium('');
    setAlbumin('');
    setCorrectedCalcium(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Corrected Calcium Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="serumCalcium">Serum Calcium (mg/dL)</Label>
            <Input
              id="serumCalcium"
              type="number"
              value={serumCalcium}
              onChange={(e) => setSerumCalcium(e.target.value)}
              placeholder="Enter Serum Calcium"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="albumin">Albumin (g/dL)</Label>
            <Input
              id="albumin"
              type="number"
              value={albumin}
              onChange={(e) => setAlbumin(e.target.value)}
              placeholder="Enter Albumin"
            />
          </div>
          <div className="flex justify-between gap-2">
            <Button onClick={calculateCorrectedCalcium} className="flex-1">Calculate</Button>
            <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
          </div>
          {correctedCalcium !== null && (
            <div className="grid gap-2">
              <Label>Corrected Calcium</Label>
              <div className="text-2xl font-bold">{correctedCalcium.toFixed(2)} mg/dL</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrectedCalciumCalculator;
