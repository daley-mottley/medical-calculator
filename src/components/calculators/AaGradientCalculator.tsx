import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function calculateAaGradient({
  fio2,
  pao2,
  paco2,
  pb = 760,
  rq = 0.8,
}: {
  fio2: number;
  pao2: number;
  paco2: number;
  pb?: number;
  rq?: number;
}): number {
  // Alveolar Gas Equation: PAO2 = FiO2 * (PB - 47) - (PaCO2 / RQ)
  // A-a Gradient = PAO2 - PaO2
  const PAO2 = fio2 * (pb - 47) - (paco2 / rq);
  return PAO2 - pao2;
}

function getInterpretation(gradient: number, age: number): string {
  // Normal A-a gradient = (Age/4) + 4
  const normal = age / 4 + 4;
  if (gradient <= normal) return 'Normal A-a gradient';
  return 'Elevated A-a gradient';
}

export const AaGradientCalculator: React.FC = () => {
  const [fio2, setFio2] = useState('0.21');
  const [pao2, setPao2] = useState('');
  const [paco2, setPaco2] = useState('');
  const [age, setAge] = useState('');
  const [pb, setPb] = useState('760');
  const [rq, setRq] = useState('0.8');
  const [result, setResult] = useState<{ gradient: number; interpretation: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const fio2Num = parseFloat(fio2);
    const pao2Num = parseFloat(pao2);
    const paco2Num = parseFloat(paco2);
    const ageNum = parseFloat(age);
    const pbNum = parseFloat(pb);
    const rqNum = parseFloat(rq);
    if ([fio2Num, pao2Num, paco2Num, ageNum].some(x => isNaN(x) || x <= 0)) {
      setError('Please enter valid positive numbers for FiO2, PaO2, PaCO2, and Age.');
      setResult(null);
      return;
    }
    const gradient = calculateAaGradient({ fio2: fio2Num, pao2: pao2Num, paco2: paco2Num, pb: pbNum, rq: rqNum });
    setResult({ gradient, interpretation: getInterpretation(gradient, ageNum) });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>A-a Gradient Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Calculate the alveolar-arterial (A-a) oxygen gradient.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">FiO₂ (fraction, e.g. 0.21 for room air)</label>
            <Input
              type="number"
              value={fio2}
              onChange={e => setFio2(e.target.value)}
              min="0"
              max="1"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">PaO₂ (mmHg)</label>
            <Input
              type="number"
              value={pao2}
              onChange={e => setPao2(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">PaCO₂ (mmHg)</label>
            <Input
              type="number"
              value={paco2}
              onChange={e => setPaco2(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Age (years)</label>
            <Input
              type="number"
              value={age}
              onChange={e => setAge(e.target.value)}
              min="0"
              step="1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Barometric Pressure (mmHg, default 760)</label>
            <Input
              type="number"
              value={pb}
              onChange={e => setPb(e.target.value)}
              min="0"
              step="1"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Respiratory Quotient (default 0.8)</label>
            <Input
              type="number"
              value={rq}
              onChange={e => setRq(e.target.value)}
              min="0.1"
              max="1"
              step="0.01"
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">Calculate A-a Gradient</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>A-a Gradient: <span className="font-mono">{result.gradient.toFixed(1)} mmHg</span></div>
            <div>Interpretation: <span className="font-mono">{result.interpretation}</span></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AaGradientCalculator; 