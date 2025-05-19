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
    // Real ASCVD 10-year risk calculation using 2013 ACC/AHA Pooled Cohort Equations
    // Reference: https://tools.acc.org/ASCVD-Risk-Estimator-Plus/#!/calculate/estimate/
    // Variables: age, sex, race, total cholesterol, HDL, systolic BP, BP meds, diabetes, smoker
    // Only valid for ages 40-79

    const a = parseFloat(age);
    const tc = parseFloat(totalCholesterol);
    const hdl = parseFloat(hdlCholesterol);
    const sbp = parseFloat(systolicBP);

    if (
      isNaN(a) || a < 40 || a > 79 ||
      isNaN(tc) || tc <= 0 ||
      isNaN(hdl) || hdl <= 0 ||
      isNaN(sbp) || sbp <= 0 ||
      sex === '' || race === ''
    ) {
      setAscvdRisk('Invalid input. Please fill all required fields. Age must be 40-79.');
      return;
    }

    // Natural log of variables
    const lnAge = Math.log(a);
    const lnTC = Math.log(tc);
    const lnHDL = Math.log(hdl);
    const lnSBP = Math.log(sbp);

    // Coefficients for each group
    // Source: https://www.mdcalc.com/calc/10061/ascvd-atherosclerotic-cardiovascular-disease-2013-risk-calculator-aha-acc
    let coeffs: any = null;
    let mean: number;
    let baselineSurvival: number;

    if (sex === 'male' && race === 'white') {
      coeffs = {
        lnAge: 12.344,
        lnTC: 11.853,
        lnAge_lnTC: -2.664,
        lnHDL: -7.990,
        lnAge_lnHDL: 1.769,
        lnSBP_Treated: 1.797,
        lnSBP_Untreated: 1.764,
        smoker: 7.837,
        lnAge_smoker: -1.795,
        diabetes: 0.658
      };
      mean = 61.18;
      baselineSurvival = 0.9144;
    } else if (sex === 'male' && race === 'black') {
      coeffs = {
        lnAge: 2.469,
        lnTC: 0.302,
        lnAge_lnTC: 0,
        lnHDL: -0.307,
        lnAge_lnHDL: 0,
        lnSBP_Treated: 1.916,
        lnSBP_Untreated: 1.809,
        smoker: 0.549,
        lnAge_smoker: 0,
        diabetes: 0.645
      };
      mean = 19.54;
      baselineSurvival = 0.8954;
    } else if (sex === 'female' && race === 'white') {
      coeffs = {
        lnAge: -29.799,
        lnTC: 4.884,
        lnAge_lnTC: -2.019,
        lnHDL: -13.540,
        lnAge_lnHDL: 3.149,
        lnSBP_Treated: 2.019,
        lnSBP_Untreated: 1.957,
        smoker: 7.574,
        lnAge_smoker: -1.665,
        diabetes: 0.661
      };
      mean = -29.18;
      baselineSurvival = 0.9665;
    } else if (sex === 'female' && race === 'black') {
      coeffs = {
        lnAge: 17.114,
        lnTC: 0.940,
        lnAge_lnTC: 0,
        lnHDL: -18.920,
        lnAge_lnHDL: 4.475,
        lnSBP_Treated: 29.291,
        lnSBP_Untreated: 27.820,
        smoker: 0.691,
        lnAge_smoker: 0,
        diabetes: 0.874
      };
      mean = 86.61;
      baselineSurvival = 0.9533;
    } else {
      // For "other" race, use white coefficients as recommended
      if (sex === 'male') {
        coeffs = {
          lnAge: 12.344,
          lnTC: 11.853,
          lnAge_lnTC: -2.664,
          lnHDL: -7.990,
          lnAge_lnHDL: 1.769,
          lnSBP_Treated: 1.797,
          lnSBP_Untreated: 1.764,
          smoker: 7.837,
          lnAge_smoker: -1.795,
          diabetes: 0.658
        };
        mean = 61.18;
        baselineSurvival = 0.9144;
      } else {
        coeffs = {
          lnAge: -29.799,
          lnTC: 4.884,
          lnAge_lnTC: -2.019,
          lnHDL: -13.540,
          lnAge_lnHDL: 3.149,
          lnSBP_Treated: 2.019,
          lnSBP_Untreated: 1.957,
          smoker: 7.574,
          lnAge_smoker: -1.665,
          diabetes: 0.661
        };
        mean = -29.18;
        baselineSurvival = 0.9665;
      }
    }

    // Calculate risk score
    const treated = onBPmeds;
    const riskScore =
      coeffs.lnAge * lnAge +
      coeffs.lnTC * lnTC +
      (coeffs.lnAge_lnTC || 0) * lnAge * lnTC +
      coeffs.lnHDL * lnHDL +
      (coeffs.lnAge_lnHDL || 0) * lnAge * lnHDL +
      (treated ? coeffs.lnSBP_Treated : coeffs.lnSBP_Untreated) * lnSBP +
      coeffs.smoker * (smoker ? 1 : 0) +
      (coeffs.lnAge_smoker || 0) * lnAge * (smoker ? 1 : 0) +
      coeffs.diabetes * (diabetes ? 1 : 0);

    // Calculate risk
    const risk = 1 - Math.pow(baselineSurvival, Math.exp(riskScore - mean));
    const percent = (risk * 100).toFixed(1);
    setAscvdRisk(`${percent}% 10-year ASCVD risk`);
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
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-medium text-sm mb-2">10-Year ASCVD Risk</h4>
            <p>{ascvdRisk}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
