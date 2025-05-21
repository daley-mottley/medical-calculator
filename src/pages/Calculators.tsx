import { useState, useEffect } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Heart, Scale, Brain, Droplets } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BMICalculator } from '@/components/calculators/BMICalculator';
import IdealBodyWeightCalculator from '@/components/calculators/IdealBodyWeightCalculator';
import { BSACalculator } from '@/components/calculators/BSACalculator';
import { IBWCalculator } from '@/components/calculators/IBWCalculator';
import { PregnancyCalculator } from '@/components/calculators/PregnancyCalculator';
import { ASCVDCalculator } from '@/components/calculators/ASCVDCalculator';
import HASBLEDCalculator from '@/components/calculators/HASBLEDCalculator';
import QTcIntervalCalculator from '@/components/calculators/QTcIntervalCalculator';
import CHA2DS2VASCCalculator from '@/components/calculators/CHA2DS2VASCCalculator';
import EGFRCreatinineCalculator from '@/components/calculators/eGFRCreatinineCalculator';
import CreatinineClearanceCalculator from '@/components/calculators/CreatinineClearanceCalculator';
import FractionalExcretionSodiumCalculator from '@/components/calculators/FractionalExcretionSodiumCalculator';
import NIHStrokeScaleCalculator from '@/components/calculators/NIHStrokeScaleCalculator';
import GlasgowComaScaleCalculator from '@/components/calculators/GlasgowComaScaleCalculator';
import FOURScoreCalculator from '@/components/calculators/FOURScoreCalculator';
import CURB65Calculator from '@/components/calculators/CURB65Calculator';
import WellsScoreCalculator from '@/components/calculators/WellsScoreCalculator';
import AaGradientCalculator from '@/components/calculators/AaGradientCalculator';
import { useParams, useNavigate } from 'react-router-dom';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { useFavorites } from '@/hooks/use-favorites';

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
    icon: Droplets, // Changed from LungsIcon to Droplets as a placeholder
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
      { name: "Ideal Body Weight", description: "Ideal Body Weight calculator" },
      { name: "Pregnancy Calculator", description: "EDC and gestational age calculation" },
    ],
  },
];

const calculatorRouteMap: Record<string, string> = {
  'bmi': 'BMI',
  'bsa': 'BSA',
  'ibw-abw': 'IBW & ABW',
  'ideal-body-weight': 'Ideal Body Weight',
  'pregnancy': 'Pregnancy Calculator',
  'ascvd-risk': 'ASCVD Risk',
  'has-bled': 'HAS-BLED Score',
  'qtc-interval': 'QTc Interval',
  'cha2ds2-vasc': 'CHA₂DS₂-VASc',
  'egfr': 'eGFR',
  'creatinine-clearance': 'Creatinine Clearance',
  'fractional-excretion-sodium': 'Fractional Excretion of Sodium',
  'nih-stroke-scale': 'NIH Stroke Scale',
  'glasgow-coma-scale': 'Glasgow Coma Scale',
  'four-score': 'FOUR Score',
  'curb-65': 'CURB-65',
  'wells-score': 'Wells Score',
  'a-a-gradient': 'A-a Gradient',
};

const calculatorRouteSegment: Record<string, string> = {
  'BMI': 'bmi',
  'BSA': 'bsa',
  'IBW & ABW': 'ibw-abw',
  'Ideal Body Weight': 'ideal-body-weight',
  'Pregnancy Calculator': 'pregnancy',
  'ASCVD Risk': 'ascvd-risk',
  'HAS-BLED Score': 'has-bled',
  'QTc Interval': 'qtc-interval',
  'CHA₂DS₂-VASc': 'cha2ds2-vasc',
  'eGFR': 'egfr',
  'Creatinine Clearance': 'creatinine-clearance',
  'Fractional Excretion of Sodium': 'fractional-excretion-sodium',
  'NIH Stroke Scale': 'nih-stroke-scale',
  'Glasgow Coma Scale': 'glasgow-coma-scale',
  'FOUR Score': 'four-score',
  'CURB-65': 'curb-65',
  'Wells Score': 'wells-score',
  'A-a Gradient': 'a-a-gradient',
};

const calculatorComponentMap: Record<string, JSX.Element> = {
  'BMI': <BMICalculator />,
  'BSA': <BSACalculator />,
  'IBW & ABW': <IBWCalculator />,
  'Ideal Body Weight': <IdealBodyWeightCalculator />,
  'Pregnancy Calculator': <PregnancyCalculator />,
  'ASCVD Risk': <ASCVDCalculator />,
  'HAS-BLED Score': <HASBLEDCalculator />,
  'QTc Interval': <QTcIntervalCalculator />,
  'CHA₂DS₂-VASc': <CHA2DS2VASCCalculator />,
  'eGFR': <EGFRCreatinineCalculator />,
  'Creatinine Clearance': <CreatinineClearanceCalculator />,
  'Fractional Excretion of Sodium': <FractionalExcretionSodiumCalculator />,
  'NIH Stroke Scale': <NIHStrokeScaleCalculator />,
  'Glasgow Coma Scale': <GlasgowComaScaleCalculator />,
  'FOUR Score': <FOURScoreCalculator />,
  'CURB-65': <CURB65Calculator />,
  'Wells Score': <WellsScoreCalculator />,
  'A-a Gradient': <AaGradientCalculator />,
};

const Calculators = () => {
  const { calculatorId } = useParams<{ calculatorId?: string }>();
  const navigate = useNavigate();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Scroll to top when navigating to a calculator page
  useEffect(() => {
    if (calculatorId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [calculatorId]);

  if (calculatorId) {
    const calcName = calculatorRouteMap[calculatorId];
    if (calcName && calculatorComponentMap[calcName]) {
      return (
        <AppLayout>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{calcName} Calculator</h1>
              <FavoriteButton
                favorited={isFavorite(calcName)}
                onClick={() =>
                  isFavorite(calcName)
                    ? removeFavorite(calcName)
                    : addFavorite(calcName)
                }
              />
            </div>
            <Button variant="outline" onClick={() => navigate('/calculators')}>Back to Calculators</Button>
          </div>
          {calculatorComponentMap[calcName]}
        </AppLayout>
      );
    } else {
      // Invalid calculatorId
      return (
        <AppLayout>
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Calculator Not Found</h1>
            <Button variant="outline" onClick={() => navigate('/calculators')}>Back to Calculators</Button>
          </div>
        </AppLayout>
      );
    }
  }

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
                    <Card key={i} className="overflow-hidden relative">
                      <div className="absolute top-3 right-3 z-10">
                        <FavoriteButton
                          favorited={isFavorite(calculator.name)}
                          onClick={() =>
                            isFavorite(calculator.name)
                              ? removeFavorite(calculator.name)
                              : addFavorite(calculator.name)
                          }
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{calculator.name}</CardTitle>
                        <CardDescription>{calculator.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <Button
                          className="w-full bg-medical-primary hover:bg-medical-secondary"
                          onClick={() => {
                            const route = calculatorRouteSegment[calculator.name];
                            if (route) {
                              navigate(`/calculators/${route}`);
                            }
                          }}
                        >
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
          {favorites.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <Calculator className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium">No favorite calculators</h3>
                <p className="text-muted-foreground my-3">
                  Add calculators to your favorites for quick access
                </p>
                <Button variant="outline" onClick={() => navigate('/calculators')}>Browse All Calculators</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {calculatorCategories.flatMap(category =>
                category.calculators.filter(calculator => favorites.includes(calculator.name)).map((calculator, i) => (
                  <Card key={category.id + '-' + calculator.name} className="overflow-hidden relative">
                    <div className="absolute top-3 right-3 z-10">
                      <FavoriteButton
                        favorited={isFavorite(calculator.name)}
                        onClick={() =>
                          isFavorite(calculator.name)
                            ? removeFavorite(calculator.name)
                            : addFavorite(calculator.name)
                        }
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{calculator.name}</CardTitle>
                      <CardDescription>{calculator.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <Button
                        className="w-full bg-medical-primary hover:bg-medical-secondary"
                        onClick={() => {
                          const route = calculatorRouteSegment[calculator.name];
                          if (route) {
                            navigate(`/calculators/${route}`);
                          }
                        }}
                      >
                        Open Calculator
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
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
                    <Button
                      className="w-full bg-medical-primary hover:bg-medical-secondary"
                      onClick={() => {
                        const route = calculatorRouteSegment[calculator.name];
                        if (route) {
                          navigate(`/calculators/${route}`);
                        }
                      }}
                    >
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
