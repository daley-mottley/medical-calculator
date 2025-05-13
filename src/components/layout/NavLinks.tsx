import { Stethoscope, Pill, Calculator, FileCheck, Heart, Bed, CircleHelp } from "lucide-react";
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

export const NavLinks = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground tracking-wider">
          Reference Tools
        </h3>
        <NavItem to="/drugs" icon={Pill} label="Drug Information" />
        <NavItem to="/calculators" icon={Calculator} label="Medical Calculators" />
      </div>

      <div className="space-y-1">
        <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground tracking-wider">
          Clinical Support
        </h3>
        <NavItem to="/diagnoses" icon={Stethoscope} label="Differential Diagnoses" />
        <NavItem to="/guidelines" icon={FileCheck} label="Treatment Guidelines" />
        <NavItem to="/vitals" icon={Heart} label="Vital References" />
      </div>

      <div className="space-y-1">
        <h3 className="px-3 text-xs font-medium uppercase text-muted-foreground tracking-wider">
          Patient Care
        </h3>
        <NavItem to="/notes" icon={Bed} label="Patient Notes" />
        <NavItem to="/help" icon={CircleHelp} label="Help & Resources" />
      </div>
    </div>
  );
};
