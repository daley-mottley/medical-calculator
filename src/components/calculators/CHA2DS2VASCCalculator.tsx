import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/components/ui/use-toast';

const riskFactors = [
  { key: 'chf', label: 'Congestive Heart Failure', points: 1 },
  { key: 'htn', label: 'Hypertension', points: 1 },
  { key: 'age75', label: 'Age ≥ 75 years', points: 2 },
  { key: 'dm', label: 'Diabetes Mellitus', points: 1 },
  { key: 'stroke', label: 'Stroke/TIA/Thromboembolism', points: 2 },
  { key: 'vascular', label: 'Vascular Disease', points: 1 },
  { key: 'age65', label: 'Age 65–74 years', points: 1 },
  { key: 'female', label: 'Sex Category (Female)', points: 1 },
];

function calculateScore(selected: Record<string, boolean>) {
  let score = 0;
  if (selected['age75']) score += 2;
  else if (selected['age65']) score += 1;
  riskFactors.forEach(factor => {
    if (factor.key !== 'age75' && factor.key !== 'age65' && selected[factor.key]) {
      score += factor.points;
    }
  });
  return score;
}

function getStrokeRisk(score: number): string {
  // Example risk table (approximate, for demonstration)
  const risks = [
    '0% (Low)',
    '1.3%',
    '2.2%',
    '3.2%',
    '4.0%',
    '6.7%',
    '9.8%',
    '9.6%',
    '12.5%',
    '>15% (High)'
  ];
  return risks[Math.min(score, risks.length - 1)];
}

export const CHA2DS2VASCCalculator: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<{ score: number; risk: string } | null>(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const handleChange = (key: string) => {
    setSelected(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateScore(selected);
    setResult({ score, risk: getStrokeRisk(score) });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    const calculationData = {
      calculatorType: 'CHA2DS2-VASc',
      inputs: selected,
      results: result,
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your CHA₂DS₂-VASc calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>CHA₂DS₂-VASc Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Stroke risk assessment in atrial fibrillation.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {riskFactors.map(factor => (
            <div key={factor.key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={factor.key}
                checked={!!selected[factor.key]}
                onChange={() => handleChange(factor.key)}
                className="checkbox"
              />
              <label htmlFor={factor.key} className="font-medium cursor-pointer">
                {factor.label} {factor.key === 'age75' ? '(2 points)' : factor.key === 'stroke' ? '(2 points)' : factor.key === 'age65' ? '(1 point)' : ''}
              </label>
            </div>
          ))}
          <Button type="submit" className="w-full">Calculate Score</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>Total Score: <span className="font-mono">{result.score}</span></div>
            <div>Estimated Stroke Risk: <span className="font-mono">{result.risk}</span></div>
            <Button onClick={handleSaveCalculation} className="w-full mt-3">Save Calculation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CHA2DS2VASCCalculator; 