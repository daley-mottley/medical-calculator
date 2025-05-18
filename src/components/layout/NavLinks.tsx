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
      {calculatorCategories.map((cat) => (
        <div key={cat.id} className="space-y-1">
          <h4 className="px-3 pt-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider flex items-center gap-2">
            <cat.icon className="h-4 w-4" /> {cat.name}
          </h4>
          <div className="pl-4">
            {cat.calculators.map((calc) => (
              <NavItem
                key={calc.name}
                to="/calculators" // TODO: Update to specific route if available
                icon={Calculator}
                label={calc.name}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
