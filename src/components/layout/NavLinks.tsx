import { Calculator, Save } from "lucide-react"; // Import Save icon
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
          Calculators
        </h3>
        <NavItem to="/calculators" icon={Calculator} label="Medical Calculators" />
        <NavItem to="/saved-calculations" icon={Save} label="Saved Calculations" /> {/* Add link for Saved Calculations */}
      </div>
      {/* Removed other sections */}
    </div>
  );
};
