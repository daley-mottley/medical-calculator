import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';

const AnionGapCalculator: React.FC = () => {
  const [sodium, setSodium] = useState<string>('');
  const [chloride, setChloride] = useState<string>('');
  const [bicarbonate, setBicarbonate] = useState<string>('');
  const [anionGap, setAnionGap] = useState<number | null>(null);

  const calculateAnionGap = () => {
    const Na = parseFloat(sodium);
    const Cl = parseFloat(chloride);
    const HCO3 = parseFloat(bicarbonate);

    if (!isNaN(Na) && !isNaN(Cl) && !isNaN(HCO3)) {
      const result = Na - (Cl + HCO3);
      setAnionGap(result);
    } else {
      setAnionGap(null);
    }
  };

  const handleClear = () => {
    setSodium('');
    setChloride('');
    setBicarbonate('');
    setAnionGap(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Anion Gap Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="sodium">Sodium (mEq/L)</Label>
            <Input
              id="sodium"
              type="number"
              value={sodium}
              onChange={(e) => setSodium(e.target.value)}
              placeholder="Enter Sodium"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="chloride">Chloride (mEq/L)</Label>
            <Input
              id="chloride"
              type="number"
              value={chloride}
              onChange={(e) => setChloride(e.target.value)}
              placeholder="Enter Chloride"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="bicarbonate">Bicarbonate (mEq/L)</Label>
            <Input
              id="bicarbonate"
              type="number"
              value={bicarbonate}
              onChange={(e) => setBicarbonate(e.target.value)}
              placeholder="Enter Bicarbonate"
            />
          </div>
          <div className="flex justify-between gap-2">
            <Button onClick={calculateAnionGap} className="flex-1">Calculate</Button>
            <Button onClick={handleClear} variant="outline" className="flex-1">Clear</Button>
          </div>
          {anionGap !== null && (
            <div className="grid gap-2">
              <Label>Anion Gap</Label>
              <div className="text-2xl font-bold">{anionGap.toFixed(2)} mEq/L</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnionGapCalculator;
