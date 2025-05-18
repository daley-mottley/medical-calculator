import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const options = [
  { key: 'eye', label: 'Eye Response', max: 4 },
  { key: 'motor', label: 'Motor Response', max: 4 },
  { key: 'brainstem', label: 'Brainstem Reflexes', max: 4 },
  { key: 'respiration', label: 'Respiration', max: 4 },
];

function getInterpretation(score: number): string {
  if (score === 16) return 'Normal';
  if (score >= 13) return 'Mild impairment';
  if (score >= 10) return 'Moderate impairment';
  if (score >= 7) return 'Severe impairment';
  return 'Very severe impairment or coma';
}

export const FOURScoreCalculator: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>({ eye: 4, motor: 4, brainstem: 4, respiration: 4 });
  const [result, setResult] = useState<{ total: number; interpretation: string } | null>(null);

  const handleChange = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = options.reduce((sum, opt) => sum + (scores[opt.key] || 0), 0);
    setResult({ total, interpretation: getInterpretation(total) });
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>FOUR Score Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Assess coma and impaired consciousness using the FOUR Score.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {options.map(opt => (
            <div key={opt.key} className="flex items-center gap-2">
              <label className="font-medium w-48">{opt.label}</label>
              <select
                value={scores[opt.key]}
                onChange={e => handleChange(opt.key, parseInt(e.target.value))}
                className="input input-bordered"
              >
                {Array.from({ length: opt.max + 1 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          ))}
          <Button type="submit" className="w-full">Calculate FOUR Score</Button>
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

export default FOURScoreCalculator; 