import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/apiClient';

const items = [
  { key: '1a', label: '1a. Level of Consciousness', max: 3 },
  { key: '1b', label: '1b. LOC Questions', max: 2 },
  { key: '1c', label: '1c. LOC Commands', max: 2 },
  { key: '2', label: '2. Best Gaze', max: 2 },
  { key: '3', label: '3. Visual', max: 3 },
  { key: '4', label: '4. Facial Palsy', max: 3 },
  { key: '5a', label: '5a. Motor Arm (Left)', max: 4 },
  { key: '5b', label: '5b. Motor Arm (Right)', max: 4 },
  { key: '6a', label: '6a. Motor Leg (Left)', max: 4 },
  { key: '6b', label: '6b. Motor Leg (Right)', max: 4 },
  { key: '7', label: '7. Limb Ataxia', max: 2 },
  { key: '8', label: '8. Sensory', max: 2 },
  { key: '9', label: '9. Best Language', max: 3 },
  { key: '10', label: '10. Dysarthria', max: 2 },
  { key: '11', label: '11. Extinction/Inattention', max: 2 },
];

function getInterpretation(score: number): string {
  if (score <= 4) return 'Minor stroke';
  if (score <= 15) return 'Moderate stroke';
  if (score <= 20) return 'Moderate to severe stroke';
  return 'Severe stroke';
}

export const NIHStrokeScaleCalculator: React.FC = () => {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ total: number; interpretation: string } | null>(null);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleChange = (key: string, value: number) => {
    setScores(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let total = 0;
    items.forEach(item => {
      total += scores[item.key] || 0;
    });
    setResult({ total, interpretation: getInterpretation(total) });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    setSaving(true);
    const calculationData = {
      type: 'NIH Stroke Scale',
      inputs: { ...scores },
      result,
      timestamp: Date.now(),
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your NIHSS calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>NIH Stroke Scale (NIHSS) Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Assess stroke severity using the NIHSS.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {items.map(item => (
            <div key={item.key} className="flex items-center gap-2">
              <label className="font-medium w-64">{item.label}</label>
              <select
                value={scores[item.key] ?? 0}
                onChange={e => handleChange(item.key, parseInt(e.target.value))}
                className="input input-bordered"
              >
                {Array.from({ length: item.max + 1 }, (_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>
          ))}
          <Button type="submit" className="w-full">Calculate NIHSS</Button>
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

export default NIHStrokeScaleCalculator; 