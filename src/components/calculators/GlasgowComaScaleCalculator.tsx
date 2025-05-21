import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/apiClient';

const eyeOptions = [
  { value: 4, label: 'Spontaneous' },
  { value: 3, label: 'To speech' },
  { value: 2, label: 'To pain' },
  { value: 1, label: 'None' },
];
const verbalOptions = [
  { value: 5, label: 'Oriented' },
  { value: 4, label: 'Confused' },
  { value: 3, label: 'Inappropriate words' },
  { value: 2, label: 'Incomprehensible sounds' },
  { value: 1, label: 'None' },
];
const motorOptions = [
  { value: 6, label: 'Obeys commands' },
  { value: 5, label: 'Localizes pain' },
  { value: 4, label: 'Withdraws from pain' },
  { value: 3, label: 'Flexion to pain (decorticate)' },
  { value: 2, label: 'Extension to pain (decerebrate)' },
  { value: 1, label: 'None' },
];

function getInterpretation(score: number): string {
  if (score >= 13) return 'Mild brain injury';
  if (score >= 9) return 'Moderate brain injury';
  return 'Severe brain injury';
}

export const GlasgowComaScaleCalculator: React.FC = () => {
  const [eye, setEye] = useState(4);
  const [verbal, setVerbal] = useState(5);
  const [motor, setMotor] = useState(6);
  const [result, setResult] = useState<{ total: number; interpretation: string } | null>(null);
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = eye + verbal + motor;
    setResult({ total, interpretation: getInterpretation(total) });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    setSaving(true);
    const calculationData = {
      type: 'Glasgow Coma Scale',
      inputs: { eye, verbal, motor },
      result,
      timestamp: Date.now(),
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your GCS calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Glasgow Coma Scale (GCS) Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Assess level of consciousness using the GCS.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Eye Opening</label>
            <select
              value={eye}
              onChange={e => setEye(Number(e.target.value))}
              className="input input-bordered w-full"
            >
              {eyeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Verbal Response</label>
            <select
              value={verbal}
              onChange={e => setVerbal(Number(e.target.value))}
              className="input input-bordered w-full"
            >
              {verbalOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Motor Response</label>
            <select
              value={motor}
              onChange={e => setMotor(Number(e.target.value))}
              className="input input-bordered w-full"
            >
              {motorOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">Calculate GCS</Button>
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

export default GlasgowComaScaleCalculator; 