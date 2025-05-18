import { Calculator, Save, Heart, Scale, Brain, Droplets } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const NavItem = ({ to, icon: Icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-medical-primary text-primary-foreground"
          : "text-foreground hover:bg-accent"
      )
    }
  >
    <Icon className="h-5 w-5" />
    {label}
  </NavLink>
);

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

const calculatorCategories = [
  {
    id: "cardio",
    name: "Cardiovascular",
    icon: Heart,
    calculators: [
      { name: "ASCVD Risk" },
      { name: "QTc Interval" },
      { name: "HAS-BLED Score" },
      { name: "CHA₂DS₂-VASc" },
    ],
  },
  {
    id: "renal",
    name: "Renal",
    icon: Droplets,
    calculators: [
      { name: "eGFR" },
      { name: "Creatinine Clearance" },
      { name: "Fractional Excretion of Sodium" },
    ],
  },
  {
    id: "neuro",
    name: "Neurology",
    icon: Brain,
    calculators: [
      { name: "NIH Stroke Scale" },
      { name: "Glasgow Coma Scale" },
      { name: "FOUR Score" },
    ],
  },
  {
    id: "pulmonary",
    name: "Pulmonary",
    icon: Droplets, // Placeholder for lungs
    calculators: [
      { name: "CURB-65" },
      { name: "Wells Score" },
      { name: "A-a Gradient" },
    ],
  },
  {
    id: "general",
    name: "General",
    icon: Scale,
    calculators: [
      { name: "BMI" },
      { name: "BSA" },
      { name: "IBW & ABW" },
      { name: "Ideal Body Weight" },
      { name: "Pregnancy Calculator" },
    ],
  },
];

export const NavLinks = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground tracking-wider">
          Calculators
        </h3>
        <NavItem to="/calculators" icon={Calculator} label="All Calculators" />
        <NavItem to="/saved-calculations" icon={Save} label="Saved Calculations" />
      </div>
      <div className="my-4 border-t border-border" />
      {calculatorCategories.map((cat) => (
        <div
          key={cat.id}
          className="bg-card rounded-xl shadow-md mb-6 p-3 transition-colors duration-200"
        >
          <h4
            className="flex items-center gap-2 px-2 py-1 text-sm font-semibold uppercase text-medical-primary tracking-wider mb-2 hover:bg-medical-primary/10 rounded-lg cursor-pointer transition-colors duration-200"
            tabIndex={0}
          >
            <cat.icon className="h-5 w-5 text-medical-primary" />
            <span className="text-base font-bold">{cat.name}</span>
          </h4>
          <div className="pl-2 flex flex-col gap-1">
            {cat.calculators.map((calc) => (
              <NavLink
                key={calc.name}
                to={`/calculators/${calculatorRouteSegment[calc.name]}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-medical-primary/90 text-primary-foreground shadow"
                      : "text-foreground hover:bg-medical-primary/10 hover:text-medical-primary"
                  )
                }
              >
                <Calculator className="h-4 w-4" />
                {calc.name}
              </NavLink>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
