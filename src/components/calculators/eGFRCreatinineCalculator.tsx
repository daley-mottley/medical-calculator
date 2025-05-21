import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';

function calculateEGFR({
  creatinine,
  age,
  sex,
  isBlack,
}: {
  creatinine: number;
  age: number;
  sex: 'male' | 'female';
  isBlack: boolean;
}): number {
  // CKD-EPI 2009 formula (mg/dL)
  // https://www.kidney.org/content/ckd-epi-creatinine-equation-2009
  let k = sex === 'female' ? 0.7 : 0.9;
  let a = sex === 'female' ? -0.329 : -0.411;
  let min = Math.min(creatinine / k, 1);
  let max = Math.max(creatinine / k, 1);
  let sexFactor = sex === 'female' ? 1.018 : 1;
  let raceFactor = isBlack ? 1.159 : 1;
  return 141 * Math.pow(min, a) * Math.pow(max, -1.209) * Math.pow(0.993, age) * sexFactor * raceFactor;
}

function getInterpretation(egfr: number): string {
  if (egfr >= 90) return 'Normal or high (G1)';
  if (egfr >= 60) return 'Mildly decreased (G2)';
  if (egfr >= 45) return 'Mild to moderate decrease (G3a)';
  if (egfr >= 30) return 'Moderate to severe decrease (G3b)';
  if (egfr >= 15) return 'Severely decreased (G4)';
  return 'Kidney failure (G5)';
}

export const EGFRCreatinineCalculator: React.FC = () => {
  const [creatinine, setCreatinine] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [isBlack, setIsBlack] = useState(false);
  const [result, setResult] = useState<{ egfr: number; interpretation: string } | null>(null);
  const [error, setError] = useState('');
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const creat = parseFloat(creatinine);
    const ageNum = parseInt(age);
    if (isNaN(creat) || isNaN(ageNum) || creat <= 0 || ageNum <= 0) {
      setError('Please enter valid positive numbers for creatinine and age.');
      setResult(null);
      return;
    }
    const egfr = calculateEGFR({ creatinine: creat, age: ageNum, sex, isBlack });
    setResult({ egfr, interpretation: getInterpretation(egfr) });
  };

  const handleSaveCalculation = async () => {
    if (!result) return;
    const calculationData = {
      calculatorType: 'eGFR',
      inputs: { creatinine, age, sex, isBlack },
      results: result,
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your eGFR calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    }
  };

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>eGFR Calculator (CKD-EPI)</CardTitle>
        <p className="text-muted-foreground text-sm mt-1">
          Estimate glomerular filtration rate using the CKD-EPI formula.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Serum Creatinine (mg/dL)</label>
            <Input
              type="number"
              value={creatinine}
              onChange={e => setCreatinine(e.target.value)}
              min="0"
              step="0.01"
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
          <div className="flex gap-4 items-center">
            <label className="font-medium">Sex:</label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sex"
                value="male"
                checked={sex === 'male'}
                onChange={() => setSex('male')}
                className="accent-medical-primary"
              />
              Male
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="sex"
                value="female"
                checked={sex === 'female'}
                onChange={() => setSex('female')}
                className="accent-medical-primary"
              />
              Female
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isBlack"
              checked={isBlack}
              onChange={() => setIsBlack(v => !v)}
              className="checkbox accent-medical-primary"
            />
            <label htmlFor="isBlack" className="font-medium cursor-pointer">Black race</label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" className="w-full">Calculate eGFR</Button>
        </form>
        {result && (
          <div className="mt-6 space-y-2">
            <div className="font-medium">Results:</div>
            <div>eGFR: <span className="font-mono">{result.egfr.toFixed(1)} mL/min/1.73m²</span></div>
            <div>Interpretation: <span className="font-mono">{result.interpretation}</span></div>
            <Button onClick={handleSaveCalculation} className="w-full mt-3">Save Calculation</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EGFRCreatinineCalculator; 