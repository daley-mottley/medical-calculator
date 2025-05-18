import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function calculateFENa({
  urineNa,
  plasmaNa,
  urineCr,
  plasmaCr,
}: {
  urineNa: number;
  plasmaNa: number;
  urineCr: number;
  plasmaCr: number;
}): number {
  // FENa (%) = (Urine Na × Plasma Cr) / (Plasma Na × Urine Cr) × 100
  return ((urineNa * plasmaCr) / (plasmaNa * urineCr)) * 100;
}

function getInterpretation(fena: number): string {
  if (fena < 1) return 'Suggests prerenal disease';
  if (fena >= 1 && fena <= 2) return 'Indeterminate';
  return 'Suggests intrinsic renal disease';
}

export const FractionalExcretionSodiumCalculator: React.FC = () => {
  const [urineNa, setUrineNa] = useState('');
  const [plasmaNa, setPlasmaNa] = useState('');
  const [urineCr, setUrineCr] = useState('');
  const [plasmaCr, setPlasmaCr] = useState('');
  const [result, setResult] = useState<{ fena: number; interpretation: string } | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const uNa = parseFloat(urineNa);
    const pNa = parseFloat(plasmaNa);
    const uCr = parseFloat(urineCr);
    const pCr = parseFloat(plasmaCr);
    if ([uNa, pNa, uCr, pCr].some(x => isNaN(x) || x <= 0)) {
      setError('Please enter valid positive numbers for all fields.');
      setResult(null);
      return;
    }
    const fena = calculateFENa({ urineNa: uNa, plasmaNa: pNa, urineCr: uCr, plasmaCr: pCr });
    setResult({ fena, interpretation: getInterpretation(fena) });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Fractional Excretion of Sodium (FENa) Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Calculate FENa to help differentiate prerenal and intrinsic renal causes of AKI.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Urine Sodium (mEq/L)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={urineNa}
              onChange={e => setUrineNa(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Plasma Sodium (mEq/L)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={plasmaNa}
              onChange={e => setPlasmaNa(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Urine Creatinine (mg/dL)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={urineCr}
              onChange={e => setUrineCr(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Plasma Creatinine (mg/dL)</label>
            <input
              type="number"
              className="input input-bordered w-full"
              value={plasmaCr}
              onChange={e => setPlasmaCr(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">Calculate FENa</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>FENa: <span className="font-mono">{result.fena.toFixed(2)}%</span></div>
            <div>Interpretation: <span className="font-mono">{result.interpretation}</span></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FractionalExcretionSodiumCalculator; 