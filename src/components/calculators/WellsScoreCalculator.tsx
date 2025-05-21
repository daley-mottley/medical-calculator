import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/apiClient';

const criteria = [
  { key: 'cancer', label: 'Active cancer', points: 1.0 },
  { key: 'immobilization', label: 'Paralysis, paresis, or recent immobilization of lower extremities', points: 1.0 },
  { key: 'bedridden', label: 'Recently bedridden >3 days or major surgery within 4 weeks', points: 1.0 },
  { key: 'tenderness', label: 'Localized tenderness along deep veins', points: 1.0 },
  { key: 'swelling', label: 'Entire leg swollen', points: 1.0 },
  { key: 'calf', label: 'Calf swelling >3 cm compared to other leg', points: 1.0 },
  { key: 'pitting', label: 'Pitting edema (greater in symptomatic leg)', points: 1.0 },
  { key: 'veins', label: 'Collateral superficial veins (non-varicose)', points: 1.0 },
  { key: 'alt', label: 'Alternative diagnosis as likely or more likely than DVT', points: -2.0 },
];

function getInterpretation(score: number): string {
  if (score < 2) return 'Low probability';
  if (score <= 6) return 'Moderate probability';
  return 'High probability';
}

export const WellsScoreCalculator: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ total: number; interpretation: string } | null>(null);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleChange = (key: string) => {
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = criteria.reduce((sum, c) => sum + (selected[c.key] ? c.points : 0), 0);
    setResult({ total, interpretation: getInterpretation(total) });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    setSaving(true);
    const calculationData = {
      type: 'Wells Score',
      inputs: { ...selected },
      result,
      timestamp: Date.now(),
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your Wells Score calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Wells Score for PE Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Assess probability of pulmonary embolism using the Wells Score.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {criteria.map(c => (
            <div key={c.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={c.key}
                checked={!!selected[c.key]}
                onChange={() => handleChange(c.key)}
                className="checkbox"
              />
              <label htmlFor={c.key} className="font-medium cursor-pointer">
                {c.label} {c.points > 0 ? `(+${c.points})` : `(${c.points})`}
              </label>
            </div>
          ))}
          <Button type="submit" className="w-full">Calculate Wells Score</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>Total Score: <span className="font-mono">{result.total}</span></div>
            <div>Interpretation: <span className="font-mono">{result.interpretation}</span></div>
            <Button onClick={handleSaveCalculation} className="w-full mt-3" disabled={saving}>Save Calculation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WellsScoreCalculator; 