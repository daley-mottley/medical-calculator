import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PregnancyCalculator: React.FC = () => {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [conceptionDate, setConceptionDate] = useState<Date | undefined>(undefined);
  const [edd, setEdd] = useState<string | null>(null);

  const calculateEdd = () => {
    let calculatedEdd: Date | null = null;

    if (lmpDate) {
      // Naegele's Rule: Add 280 days (40 weeks) to the first day of the last menstrual period
      calculatedEdd = new Date(lmpDate);
      calculatedEdd.setDate(calculatedEdd.getDate() + 280);
    } else if (conceptionDate) {
      // Add 266 days (38 weeks) to the date of conception
      calculatedEdd = new Date(conceptionDate);
      calculatedEdd.setDate(calculatedEdd.getDate() + 266);
    }

    if (calculatedEdd) {
      setEdd(format(calculatedEdd, 'PPP'));
    } else {
      setEdd('Please enter LMP or Conception Date');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregnancy Calculator</CardTitle>
        <CardDescription>Calculate Estimated Due Date (EDD) based on LMP or Conception Date.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lmp">Last Menstrual Period (LMP)</Label>
           <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !lmpDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {lmpDate ? format(lmpDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={lmpDate}
                onSelect={setLmpDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
         <div className="space-y-2">
          <Label htmlFor="conception">Date of Conception (Optional)</Label>
           <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !conceptionDate && "text-muted-foreground"
                )}
                disabled={!!lmpDate} // Disable if LMP is selected
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {conceptionDate ? format(conceptionDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={conceptionDate}
                onSelect={setConceptionDate}
                initialFocus
                disabled={!!lmpDate} // Disable if LMP is selected
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={calculateEdd} className="w-full bg-medical-primary hover:bg-medical-secondary">Calculate EDD</Button>
        {edd !== null && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Estimated Due Date (EDD)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold text-vivid-purple">{edd}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};
