import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const factors = [
  { key: 'confusion', label: 'Confusion', points: 1 },
  { key: 'urea', label: 'Urea > 7 mmol/L', points: 1 },
  { key: 'rr', label: 'Respiratory rate ≥ 30/min', points: 1 },
  { key: 'bp', label: 'SBP < 90 mmHg or DBP ≤ 60 mmHg', points: 1 },
  { key: 'age', label: 'Age ≥ 65 years', points: 1 },
];

function getInterpretation(score: number): string {
  if (score === 0 || score === 1) return 'Low risk (mortality <3%)';
  if (score === 2) return 'Moderate risk (mortality ~9%)';
  return 'High risk (mortality 15-40%)';
}

export const CURB65Calculator: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ total: number; interpretation: string } | null>(null);

  const handleChange = (key: string) => {
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = factors.reduce((sum, f) => sum + (selected[f.key] ? 1 : 0), 0);
    setResult({ total, interpretation: getInterpretation(total) });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>CURB-65 Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Assess pneumonia severity and mortality risk using CURB-65.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {factors.map(factor => (
            <div key={factor.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={factor.key}
                checked={!!selected[factor.key]}
                onChange={() => handleChange(factor.key)}
                className="checkbox"
              />
              <label htmlFor={factor.key} className="font-medium cursor-pointer">
                {factor.label}
              </label>
            </div>
          ))}
          <Button type="submit" className="w-full">Calculate CURB-65</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>Total Score: <span className="font-mono">{result.total}</span></div>
            <div>Interpretation: <span className="font-mono">{result.interpretation}</span></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CURB65Calculator; 