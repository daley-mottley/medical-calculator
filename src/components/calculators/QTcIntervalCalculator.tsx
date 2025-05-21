import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { apiClient } from '@/lib/apiClient';
import { Input } from '@/components/ui/input';

function calculateQTcBazett(qt: number, hr: number): number {
  // Bazett's formula: QTc = QT / sqrt(RR)
  // RR = 60 / HR (in seconds)
  if (hr <= 0) return 0;
  const rr = 60 / hr;
  return qt / Math.sqrt(rr);
}

function calculateQTcFridericia(qt: number, hr: number): number {
  // Fridericia's formula: QTc = QT / (RR)^(1/3)
  if (hr <= 0) return 0;
  const rr = 60 / hr;
  return qt / Math.cbrt(rr);
}

export const QTcIntervalCalculator: React.FC = () => {
  const [qt, setQT] = useState('');
  const [hr, setHR] = useState('');
  const [result, setResult] = useState<{ bazett: number; fridericia: number } | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const qtNum = parseFloat(qt);
    const hrNum = parseFloat(hr);
    if (isNaN(qtNum) || isNaN(hrNum) || qtNum <= 0 || hrNum <= 0) {
      setError('Please enter valid positive numbers for QT and HR.');
      setResult(null);
      return;
    }
    setResult({
      bazett: calculateQTcBazett(qtNum, hrNum),
      fridericia: calculateQTcFridericia(qtNum, hrNum),
    });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    setSaving(true);
    const calculationData = {
      type: 'QTc Interval',
      inputs: { qt, hr },
      result,
      timestamp: Date.now(),
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your QTc calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>QTc Interval Calculator</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Calculate corrected QT interval (QTc) using Bazett and Fridericia formulas.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">QT Interval (ms)</label>
            <Input
              type="number"
              value={qt}
              onChange={e => setQT(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Heart Rate (bpm)</label>
            <Input
              type="number"
              value={hr}
              onChange={e => setHR(e.target.value)}
              min="0"
              step="0.1"
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">Calculate QTc</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>Bazett: <span className="font-mono">{result.bazett.toFixed(1)} ms</span></div>
            <div>Fridericia: <span className="font-mono">{result.fridericia.toFixed(1)} ms</span></div>
            <Button onClick={handleSaveCalculation} className="w-full mt-3" disabled={saving}>Save Calculation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QTcIntervalCalculator; 