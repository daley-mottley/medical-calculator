
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pill, CheckCircle, Capsule, Search, X } from "lucide-react";

const Drugs = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Drug Information</h1>
        <p className="text-muted-foreground">
          Access comprehensive information about medications and check for interactions.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search medications by name or class..."
          className="pl-10 pr-10 h-12"
        />
        <Button variant="ghost" className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="interactions" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="reference">References</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="interactions">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Selected Medications</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="bg-medical-soft flex items-center gap-2 px-3 py-1.5 rounded-full text-sm">
                    <span>Metoprolol</span>
                    <button className="w-5 h-5 rounded-full bg-medical-primary flex items-center justify-center text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="bg-medical-soft flex items-center gap-2 px-3 py-1.5 rounded-full text-sm">
                    <span>Lisinopril</span>
                    <button className="w-5 h-5 rounded-full bg-medical-primary flex items-center justify-center text-white">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <Button variant="outline" className="rounded-full text-sm h-8">
                    + Add medication
                  </Button>
                </div>

                <Button className="bg-medical-primary hover:bg-medical-secondary">
                  Check Interactions
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-muted/30">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">No significant interaction</h4>
                      <p className="text-sm text-muted-foreground">
                        Metoprolol and Lisinopril can be safely co-administered in most patients.
                        Monitor blood pressure for potential additive effects.
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="font-medium text-lg mt-6">Common Interactions</h3>
                <div className="space-y-3">
                  {[
                    { name: "NSAIDs", description: "May reduce antihypertensive effects" },
                    { name: "SSRIs", description: "May increase risk of hypotension" },
                    { name: "Potassium supplements", description: "Increased risk of hyperkalemia" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                      <Button variant="ghost" className="text-medical-primary hover:text-medical-secondary hover:bg-medical-soft">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reference">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Metoprolol", category: "Beta blocker", icon: Pill },
              { name: "Lisinopril", category: "ACE inhibitor", icon: Capsule },
              { name: "Atorvastatin", category: "Statin", icon: Pill },
              { name: "Metformin", category: "Antidiabetic", icon: Pill },
              { name: "Amlodipine", category: "Calcium channel blocker", icon: Capsule },
              { name: "Gabapentin", category: "Anticonvulsant", icon: Capsule },
            ].map((drug, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-medical-soft flex items-center justify-center">
                      <drug.icon className="h-5 w-5 text-medical-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{drug.name}</h3>
                      <p className="text-sm text-muted-foreground">{drug.category}</p>
                    </div>
                  </div>
                  <div className="bg-muted/30 px-4 py-3 flex justify-between">
                    <Button variant="ghost" className="text-xs h-7 px-2">Dosing</Button>
                    <Button variant="ghost" className="text-xs h-7 px-2">Side Effects</Button>
                    <Button variant="ghost" className="text-xs h-7 px-2">Monitoring</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="favorites">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Pill className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Save frequently referenced medications here for quick access
            </p>
            <Button variant="outline">Browse Medications</Button>
          </div>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Drugs;
