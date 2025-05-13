
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { Calculator, HeartPulse, Scale, Thermometer, Timer } from 'lucide-react';
import { toast } from 'sonner';

export function QuickCalculators() {
  const handleCalculatorClick = (name: string) => {
    toast.info(`${name} calculator will open here`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Medical Calculators</CardTitle>
        <CardDescription>Quick access to common calculations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          <QuickActionButton 
            icon={Calculator}
            label="BMI"
            onClick={() => handleCalculatorClick('BMI')}
          />
          <QuickActionButton 
            icon={HeartPulse}
            label="CrCl"
            onClick={() => handleCalculatorClick('Creatinine Clearance')}
          />
          <QuickActionButton 
            icon={Scale}
            label="BSA"
            onClick={() => handleCalculatorClick('Body Surface Area')}
          />
          <QuickActionButton 
            icon={Thermometer}
            label="Temp Conv"
            onClick={() => handleCalculatorClick('Temperature Conversion')}
          />
          <QuickActionButton 
            icon={Timer}
            label="Pregnancy"
            onClick={() => handleCalculatorClick('Pregnancy Calculator')}
          />
          <QuickActionButton 
            icon={HeartPulse}
            label="QTc"
            onClick={() => handleCalculatorClick('QTc Calculator')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
