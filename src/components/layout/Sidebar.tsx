import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLinks } from "./NavLinks";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        aria-label="Main menu"
        aria-modal={isOpen}
        role="dialog"
        tabIndex={isOpen ? 0 : -1}
        data-testid="sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 md:w-72 bg-background border-r border-border shadow-xl rounded-r-2xl transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 focus:outline-none",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onKeyDown={e => {
          if (e.key === 'Escape') setIsOpen(false);
        }}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border md:h-[65px] bg-card rounded-tr-2xl">
          <div className="flex items-center">
            <Link to="/calculators" className="text-lg font-semibold hover:text-medical-primary transition-colors">Dashboard</Link>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-medical-primary"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>
        <div className="border-b border-border" />
        <ScrollArea className="h-[calc(100vh-65px)] custom-scrollbar">
          <div className="p-4">
            <NavLinks setIsOpen={setIsOpen} />
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};
