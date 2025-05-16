
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { checkDrugInteractions } from '@/lib/apiClient';

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
  const [drugs, setDrugs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState<any>(null); // Placeholder for interaction results

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleAddDrug = () => {
    if (searchTerm.trim() && !drugs.includes(searchTerm.trim())) {
      setDrugs([...drugs, searchTerm.trim()]);
      setSearchTerm('');
    }
  };

  const handleRemoveDrug = (drugToRemove: string) => {
    setDrugs(drugs.filter(drug => drug !== drugToRemove));
  };

  const handleCheckInteractions = async () => {
    try {
      console.log('Checking interactions for:', drugs);
      const result = await checkDrugInteractions(drugs);
      setInteractions(result);
    } catch (error) {
      console.error('Failed to check drug interactions:', error);
      setInteractions({ error: 'Failed to fetch interactions' });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Drug Interactions</CardTitle>
        <CardDescription>Check for potential drug interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative flex items-center gap-2">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search medications..."
            className="pl-8 bg-background flex-grow"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleAddDrug();
              }
            }}
          />
           <Button onClick={handleAddDrug} disabled={!searchTerm.trim()}>Add Drug</Button>
        </div>

        {drugs.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Selected Drugs</h4>
            <div className="flex flex-wrap gap-2">
              {drugs.map((drug, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-xs"
                >
                  <span className="font-medium">{drug}</span>
                  <button onClick={() => handleRemoveDrug(drug)} className="ml-1 text-primary-foreground/80 hover:text-primary-foreground">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
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

        {interactions && (
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-medium text-sm mb-2">Interaction Results</h4>
            <pre>{JSON.stringify(interactions, null, 2)}</pre>
          </div>
        )}

      </CardContent>
      <CardFooter>
        <Button onClick={handleCheckInteractions} className="w-full bg-medical-primary hover:bg-medical-secondary" disabled={drugs.length === 0}>
          Check Interactions
        </Button>
      </CardFooter>
    </Card>
  );
}
