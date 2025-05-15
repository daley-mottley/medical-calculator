import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export const ASCVDCalculator: React.FC = () => {
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'male' | 'female' | ''>('');
  const [race, setRace] = useState<'white' | 'black' | 'other' | ''>('');
  const [totalCholesterol, setTotalCholesterol] = useState('');
  const [hdlCholesterol, setHdlCholesterol] = useState('');
  const [systolicBP, setSystolicBP] = useState('');
  const [onBPmeds, setOnBPmeds] = useState(false);
  const [onStatin, setOnStatin] = useState(false);
  const [onAspirin, setOnAspirin] = useState(false);
  const [smoker, setSmoker] = useState(false);
  const [diabetes, setDiabetes] = useState(false);
  const [ascvdRisk, setAscvdRisk] = useState<string | null>(null);

  const calculateASCVD = () => {
    // Placeholder for complex ASCVD risk calculation logic
    // This calculation involves multiple variables, coefficients, and potentially different formulas based on race/sex.
    // Implementing the full, accurate calculation here is complex and requires specific lookup tables/formulas.
    // For demonstration, we'll provide a simplified placeholder result.

    const a = parseFloat(age);
    const tc = parseFloat(totalCholesterol);
    const hdl = parseFloat(hdlCholesterol);
    const sbp = parseFloat(systolicBP);

    if (isNaN(a) || a <= 0 || isNaN(tc) || tc <= 0 || isNaN(hdl) || hdl <= 0 || isNaN(sbp) || sbp <= 0 || sex === '' || race === '') {
       setAscvdRisk('Invalid input. Please fill all required fields.');
       return;
    }

    // Simulate a risk calculation based on a few factors
    let riskScore = 0;
    if (a > 60) riskScore += 5;
    if (tc > 200) riskScore += 3;
    if (hdl < 40) riskScore += 4;
    if (sbp > 140) riskScore += 3;
    if (smoker) riskScore += 5;
    if (diabetes) riskScore += 4;
    if (sex === 'female') riskScore -= 2; // Females generally lower risk

    // This is a very rough simulation and NOT medically accurate.
    // A real implementation would use published risk equations.

    setAscvdRisk(`Simulated Risk Score: ${riskScore}% (Note: This is a placeholder calculation)`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ASCVD Risk Calculator</CardTitle>
        <CardDescription>Estimate 10-year Atherosclerotic Cardiovascular Disease risk.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Years" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sex">Sex</Label>
            <Select onValueChange={(value: 'male' | 'female') => setSex(value)}>
              <SelectTrigger id="sex">
                <SelectValue placeholder="Select sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
           <Label htmlFor="race">Race</Label>
           <Select onValueChange={(value: 'white' | 'black' | 'other') => setRace(value)}>
             <SelectTrigger id="race">
               <SelectValue placeholder="Select race" />
             </SelectTrigger>
             <SelectContent>
               <SelectItem value="white">White</SelectItem>
               <SelectItem value="black">Black or African American</SelectItem>
               <SelectItem value="other">Other</SelectItem>
             </SelectContent>
           </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="totalCholesterol">Total Cholesterol (mg/dL)</Label>
            <Input id="totalCholesterol" type="number" value={totalCholesterol} onChange={(e) => setTotalCholesterol(e.target.value)} placeholder="mg/dL" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hdlCholesterol">HDL Cholesterol (mg/dL)</Label>
            <Input id="hdlCholesterol" type="number" value={hdlCholesterol} onChange={(e) => setHdlCholesterol(e.target.value)} placeholder="mg/dL" />
          </div>
        </div>

         <div className="space-y-2">
            <Label htmlFor="systolicBP">Systolic Blood Pressure (mmHg)</Label>
            <Input id="systolicBP" type="number" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} placeholder="mmHg" />
          </div>

        <div className="grid grid-cols-2 gap-4">
           <div className="flex items-center space-x-2">
             <Checkbox id="onBPmeds" checked={onBPmeds} onCheckedChange={(checked: boolean) => setOnBPmeds(checked)} />
             <Label htmlFor="onBPmeds">On BP medication</Label>
           </div>
            <div className="flex items-center space-x-2">
             <Checkbox id="onStatin" checked={onStatin} onCheckedChange={(checked: boolean) => setOnStatin(checked)} />
             <Label htmlFor="onStatin">On statin therapy</Label>
           </div>
        </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
             <Checkbox id="onAspirin" checked={onAspirin} onCheckedChange={(checked: boolean) => setOnAspirin(checked)} />
             <Label htmlFor="onAspirin">On aspirin therapy</Label>
           </div>
            <div className="flex items-center space-x-2">
             <Checkbox id="smoker" checked={smoker} onCheckedChange={(checked: boolean) => setSmoker(checked)} />
             <Label htmlFor="smoker">Smoker</Label>
           </div>
        </div>
         <div className="flex items-center space-x-2">
             <Checkbox id="diabetes" checked={diabetes} onCheckedChange={(checked: boolean) => setDiabetes(checked)} />
             <Label htmlFor="diabetes">Diabetes</Label>
           </div>


        <Button onClick={calculateASCVD} className="w-full bg-medical-primary hover:bg-medical-secondary">Calculate Risk</Button>
        {ascvdRisk !== null && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">10-Year ASCVD Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-vivid-purple">{ascvdRisk}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
