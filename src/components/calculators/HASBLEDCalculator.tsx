import React, { useState } from "react";
import { apiClient } from '@/lib/apiClient';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface HASBLEDInputs {
  hypertension: boolean;
  abnormalRenal: boolean;
  abnormalLiver: boolean;
  stroke: boolean;
  bleeding: boolean;
  labileINR: boolean;
  elderly: boolean;
  drugs: boolean;
  alcohol: boolean;
}

const initialInputs: HASBLEDInputs = {
  hypertension: false,
  abnormalRenal: false,
  abnormalLiver: false,
  stroke: false,
  bleeding: false,
  labileINR: false,
  elderly: false,
  drugs: false,
  alcohol: false,
};

function calculateHASBLED(inputs: HASBLEDInputs): number {
  return (
    Number(inputs.hypertension) +
    Number(inputs.abnormalRenal) +
    Number(inputs.abnormalLiver) +
    Number(inputs.stroke) +
    Number(inputs.bleeding) +
    Number(inputs.labileINR) +
    Number(inputs.elderly) +
    Number(inputs.drugs) +
    Number(inputs.alcohol)
  );
}

const HASBLEDCalculator: React.FC = () => {
  const [inputs, setInputs] = useState<HASBLEDInputs>(initialInputs);
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast ? useToast() : { toast: () => {} };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setInputs((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setScore(calculateHASBLED(inputs));
  };

  const handleSaveCalculation = async () => {
    if (score === null) return;
    const calculationData = {
      calculatorType: 'HAS-BLED',
      inputs,
      results: { score },
    };
    try {
      await apiClient.post('/api/saved-calculations', calculationData);
      if (toast) toast({ title: 'Calculation Saved', description: 'Your HAS-BLED calculation was saved.' });
    } catch (err) {
      if (toast) toast({ title: 'Error', description: 'Failed to save calculation.', variant: 'destructive' });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">HAS-BLED Score Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" name="hypertension" checked={inputs.hypertension} onChange={handleChange} className="mr-2" />
          Hypertension
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="abnormalRenal" checked={inputs.abnormalRenal} onChange={handleChange} className="mr-2" />
          Abnormal Renal Function
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="abnormalLiver" checked={inputs.abnormalLiver} onChange={handleChange} className="mr-2" />
          Abnormal Liver Function
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="stroke" checked={inputs.stroke} onChange={handleChange} className="mr-2" />
          Stroke
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="bleeding" checked={inputs.bleeding} onChange={handleChange} className="mr-2" />
          Bleeding History or Predisposition
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="labileINR" checked={inputs.labileINR} onChange={handleChange} className="mr-2" />
          Labile INR
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="elderly" checked={inputs.elderly} onChange={handleChange} className="mr-2" />
          Age ≥ 65 years
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="drugs" checked={inputs.drugs} onChange={handleChange} className="mr-2" />
          Concomitant Drugs (e.g., antiplatelet agents, NSAIDs)
        </label>
        <label className="flex items-center">
          <input type="checkbox" name="alcohol" checked={inputs.alcohol} onChange={handleChange} className="mr-2" />
          Alcohol Use (≥8 drinks/week)
        </label>
        <button type="submit" className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary-dark">Calculate</button>
      </form>
      {score !== null && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <span className="font-semibold">HAS-BLED Score: </span>
          <span className="text-lg">{score}</span>
          <Button onClick={handleSaveCalculation} className="w-full mt-3">Save Calculation</Button>
        </div>
      )}
    </div>
  );
};

export default HASBLEDCalculator; 