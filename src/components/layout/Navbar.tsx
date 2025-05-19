import { Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom"; // Import Link
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import { Button } from "@/components/ui/button"; // Import Button

interface NavbarProps {
  toggleSidebar: () => void;
}

export const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth(); // Use the useAuth hook

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
            <Link to="/calculators" className="text-xl font-bold text-medical-primary hover:underline focus:outline-none">
              MedicMind<span className="text-medical-secondary">Assist</span>
            </Link>
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
          {user ? ( // Conditionally render based on authentication state
            <>
              <Link to="/profile" className="rounded-full bg-medical-primary text-primary-foreground w-8 h-8 flex items-center justify-center">
                <span className="sr-only">User account</span>
                <span className="text-sm font-medium">{user.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span> {/* Display user initials */}
              </Link>
              <Button onClick={logout} variant="outline" size="sm">Logout</Button> {/* Logout button */}
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:underline">Login</Link> {/* Login link */}
              <Link to="/register" className="text-sm font-medium hover:underline">Register</Link> {/* Register link */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
