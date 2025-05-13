
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface RecentDrug {
  id: string;
  name: string;
  category: string;
}

const recentDrugs: RecentDrug[] = [
  { id: '1', name: 'Metoprolol', category: 'Beta Blocker' },
  { id: '2', name: 'Metformin', category: 'Antidiabetic' },
  { id: '3', name: 'Lisinopril', category: 'ACE Inhibitor' },
  { id: '4', name: 'Atorvastatin', category: 'Statin' },
];

export function DrugInteractions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Drug Interactions</CardTitle>
        <CardDescription>Check for potential drug interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medications..."
            className="pl-8 bg-background w-full"
          />
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium text-sm mb-2">Recently Checked</h4>
          <div className="flex flex-wrap gap-2">
            {recentDrugs.map((drug) => (
              <div 
                key={drug.id}
                className="flex items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-xs"
              >
                <span className="font-medium">{drug.name}</span>
                <span className="text-muted-foreground">{drug.category}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-medical-primary hover:bg-medical-secondary">
          Check Interactions
        </Button>
      </CardFooter>
    </Card>
  );
}
