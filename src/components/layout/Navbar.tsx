
import { Menu, Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar = ({ toggleSidebar }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-card border-b border-border shadow-sm">
      <div className="container flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
          <div className="flex items-center">
            <span className="text-xl font-bold text-medical-primary">
              MedicMind<span className="text-medical-secondary">Assist</span>
            </span>
          </div>
        </div>
        <div className="hidden md:flex w-full max-w-sm items-center space-x-2 mx-4">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search resources..."
              className="pl-8 bg-background"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-full p-1.5 hover:bg-accent">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-medical-alert rounded-full"></span>
          </button>
          <button className="rounded-full bg-medical-primary text-primary-foreground w-8 h-8 flex items-center justify-center">
            <span className="sr-only">User account</span>
            <span className="text-sm font-medium">DR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
