import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Heart, Scale, Brain, Droplets, Lungs as LungsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const calculatorCategories = [
  {
    id: "cardio",
    name: "Cardiovascular",
    icon: Heart,
    color: "text-red-500",
    bg: "bg-red-100",
    calculators: [
      { name: "ASCVD Risk", description: "Atherosclerotic cardiovascular disease risk calculator" },
      { name: "QTc Interval", description: "Corrected QT interval using different formulas" },
      { name: "HAS-BLED Score", description: "Bleeding risk in atrial fibrillation" },
      { name: "CHA₂DS₂-VASc", description: "Stroke risk assessment in atrial fibrillation" },
    ],
  },
  {
    id: "renal",
    name: "Renal",
    icon: Droplets,
    color: "text-blue-500",
    bg: "bg-blue-100",
    calculators: [
      { name: "eGFR", description: "Estimated glomerular filtration rate" },
      { name: "Creatinine Clearance", description: "Using Cockcroft-Gault equation" },
      { name: "Fractional Excretion of Sodium", description: "For acute kidney injury assessment" },
    ],
  },
  {
    id: "neuro",
    name: "Neurology",
    icon: Brain,
    color: "text-purple-500",
    bg: "bg-purple-100",
    calculators: [
      { name: "NIH Stroke Scale", description: "Assessment of stroke severity" },
      { name: "Glasgow Coma Scale", description: "Objective assessment of consciousness" },
      { name: "FOUR Score", description: "Full Outline of UnResponsiveness score" },
    ],
  },
  {
    id: "pulmonary",
    name: "Pulmonary",
    icon: LungsIcon,
    color: "text-green-500",
    bg: "bg-green-100",
    calculators: [
      { name: "CURB-65", description: "Pneumonia severity assessment" },
      { name: "Wells Score", description: "Pulmonary embolism risk assessment" },
      { name: "A-a Gradient", description: "Alveolar-arterial oxygen gradient" },
    ],
  },
  {
    id: "general",
    name: "General",
    icon: Scale,
    color: "text-amber-500",
    bg: "bg-amber-100",
    calculators: [
      { name: "BMI", description: "Body mass index calculator" },
      { name: "BSA", description: "Body surface area calculations" },
      { name: "IBW & ABW", description: "Ideal and adjusted body weight" },
      { name: "Pregnancy Calculator", description: "EDC and gestational age calculation" },
    ],
  },
];

const Calculators = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Medical Calculators</h1>
        <p className="text-muted-foreground">
          Evidence-based tools to support clinical decision-making
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full space-y-6">
        <div className="overflow-auto scrollbar-hidden">
          <TabsList className="h-10 inline-flex min-w-max">
            <TabsTrigger value="all" className="rounded-lg">All Calculators</TabsTrigger>
            <TabsTrigger value="recent" className="rounded-lg">Recent</TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-lg">Favorites</TabsTrigger>
            {calculatorCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="rounded-lg">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all">
          <div className="grid gap-8">
            {calculatorCategories.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-4">
                  <div className={`rounded-full p-2 ${category.bg}`}>
                    <category.icon className={`h-5 w-5 ${category.color}`} />
                  </div>
                  <h2 className="text-lg font-medium">{category.name} Calculators</h2>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.calculators.map((calculator, i) => (
                    <Card key={i} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{calculator.name}</CardTitle>
                        <CardDescription>{calculator.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button className="w-full bg-medical-primary hover:bg-medical-secondary">
                          Open Calculator
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium">No recent calculators</h3>
              <p className="text-muted-foreground my-3">
                Calculators you use will appear here for quick access
              </p>
              <Button variant="outline">Browse All Calculators</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardContent className="p-6 text-center">
              <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-xl font-medium">No favorite calculators</h3>
              <p className="text-muted-foreground my-3">
                Add calculators to your favorites for quick access
              </p>
              <Button variant="outline">Browse All Calculators</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {calculatorCategories.map((category) => (
          <TabsContent key={category.id} value={category.id}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.calculators.map((calculator, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{calculator.name}</CardTitle>
                    <CardDescription>{calculator.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button className="w-full bg-medical-primary hover:bg-medical-secondary">
                      Open Calculator
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </AppLayout>
  );
};

export default Calculators;
