import React, { useEffect, useState } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { QuickActionButton } from '@/components/ui/QuickActionButton';
import { Button } from '@/components/ui/button';
import { Save, Calculator, Trash2, Eye, Heart, Brain, Droplets } from 'lucide-react';
import { apiClient } from '@/lib/apiClient';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'framer-motion';

interface SavedCalculation {
  id: string;
  calculatorType: string;
  inputs: any;
  results: any;
  timestamp: string;
  name?: string;
}

const calculatorTypeIcons: Record<string, React.ReactNode> = {
  'BMI': <Calculator className="text-medical-primary" />,
  'HAS-BLED': <Heart className="text-medical-primary" />,
  'CHA₂DS₂-VASc': <Brain className="text-medical-primary" />,
  'eGFR': <Droplets className="text-medical-primary" />,
  'Creatinine Clearance': <Droplets className="text-medical-primary" />,
  // Add more mappings as needed
};

const SavedCalculationsPage = () => {
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCalculation, setSelectedCalculation] = useState<SavedCalculation | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SavedCalculation | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedCalculations = async () => {
      try {
        const response = await apiClient.get('/api/saved-calculations');
        setSavedCalculations(response.data);
      } catch (err) {
        setError('Failed to fetch saved calculations.');
        console.error('Error fetching saved calculations:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedCalculations();
  }, []);

  const handleView = (calculation: SavedCalculation) => {
    setSelectedCalculation(calculation);
  };

  const handleDelete = async (id: string) => {
    const filtered = savedCalculations.filter(calc => calc.id !== id);
    setSavedCalculations(filtered);
    setDeleteTarget(null);
    // TODO: Call backend to delete
    // await apiClient.delete(`/api/saved-calculations/${id}`);
  };

  const renderInputs = (inputs: any) => {
    if (!inputs || typeof inputs !== 'object') return null;
    return (
      <ul className="text-xs text-muted-foreground space-y-1">
        {Object.entries(inputs).map(([key, value]) => (
          <li key={key}><span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>: {String(value)}</li>
        ))}
      </ul>
    );
  };

  const renderResults = (results: any) => {
    if (!results || typeof results !== 'object') return null;
    return (
      <ul className="text-xs text-medical-primary space-y-1">
        {Object.entries(results).map(([key, value]) => (
          <li key={key}><span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>: {String(value)}</li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        <div>Loading saved calculations...</div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        </div>
        <div className="text-red-500">{error}</div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Saved Calculations</h1>
        <p className="text-muted-foreground">
          Your previously saved medical calculation results.
        </p>
      </div>

      {savedCalculations.length === 0 ? (
        <Card className="mx-auto max-w-md animate-fade-in">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <Save className="mx-auto h-12 w-12 text-medical-primary mb-3 animate-bounce" />
            </motion.div>
            <h3 className="text-xl font-medium">No saved calculations yet</h3>
            <p className="text-muted-foreground my-3">
              Save calculations from the calculator pages to see them here.
            </p>
            <Button className="mt-2 animate-pulse" onClick={() => navigate('/calculators')}>
              Browse Calculators
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ScrollArea className="w-full max-h-[70vh]">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {savedCalculations.map((calculation, idx) => (
                <motion.div
                  key={calculation.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: idx * 0.07, type: 'spring', stiffness: 120 }}
                >
                  <Card
                    className="relative group shadow-xl border-2 border-medical-primary/30 hover:border-medical-primary transition-all bg-white/90 hover:bg-medical-primary/5 animate-fade-in"
                  >
                    <CardHeader className="pb-2 flex flex-row items-center gap-3">
                      <motion.div whileHover={{ scale: 1.15, rotate: 8 }} whileTap={{ scale: 0.95 }}>
                        <Avatar className="h-12 w-12 bg-medical-primary/10">
                          {calculatorTypeIcons[calculation.calculatorType] || <Calculator className="text-medical-primary animate-spin-slow" />}
                          <AvatarFallback className="text-medical-primary font-bold">
                            {calculation.calculatorType[0]}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="flex-1">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                          {calculation.name || `${calculation.calculatorType} Calculation`}
                          <Badge variant="secondary" className="ml-2 animate-bounce">
                            {calculation.calculatorType}
                          </Badge>
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          <span title={calculation.timestamp}>
                            Saved on: {new Date(calculation.timestamp).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 pb-4">
                      <div className="mb-2 grid grid-cols-2 gap-2">
                        <div>
                          <span className="block text-xs font-semibold text-muted-foreground mb-1">Inputs</span>
                          {renderInputs(calculation.inputs)}
                        </div>
                        <div>
                          <span className="block text-xs font-semibold text-medical-primary mb-1">Results</span>
                          <div className="bg-medical-primary/10 rounded p-2 animate-pulse">
                            {renderResults(calculation.results)}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <QuickActionButton icon={Eye} label="View" onClick={() => handleView(calculation)} variant="default" />
                        <QuickActionButton icon={Trash2} label="Delete" onClick={() => setDeleteTarget(calculation)} variant="secondary" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}

      {/* Detail View Dialog */}
      <Dialog open={!!selectedCalculation} onOpenChange={open => !open && setSelectedCalculation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedCalculation?.name || `${selectedCalculation?.calculatorType} Calculation`}
            </DialogTitle>
            <DialogDescription>
              Detailed view of your saved calculation.
            </DialogDescription>
          </DialogHeader>
          {selectedCalculation && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-medical-primary/10">
                  {calculatorTypeIcons[selectedCalculation.calculatorType] || <Calculator className="text-medical-primary" />}
                  <AvatarFallback className="text-medical-primary font-bold">
                    {selectedCalculation.calculatorType[0]}
                  </AvatarFallback>
                </Avatar>
                <Badge variant="secondary">{selectedCalculation.calculatorType}</Badge>
                <span className="text-xs text-muted-foreground ml-auto">
                  Saved on: {new Date(selectedCalculation.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-semibold text-muted-foreground mb-1">Inputs</span>
                  {renderInputs(selectedCalculation.inputs)}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-medical-primary mb-1">Results</span>
                  <div className="bg-medical-primary/10 rounded p-2">
                    {renderResults(selectedCalculation.results)}
                  </div>
                </div>
              </div>
              <DialogClose asChild>
                <Button variant="outline" className="w-full mt-4">Close</Button>
              </DialogClose>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={open => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Calculation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this saved calculation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTarget && handleDelete(deleteTarget.id)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
};

export default SavedCalculationsPage;
