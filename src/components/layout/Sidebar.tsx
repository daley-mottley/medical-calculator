
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavLinks } from "./NavLinks";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

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
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border md:h-[65px]">
          <div className="flex items-center">
            <span className="text-lg font-semibold">Menu</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden rounded-md p-2 text-foreground hover:bg-accent"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </button>
        </div>
        <ScrollArea className="h-[calc(100vh-65px)]">
          <div className="p-4">
            <NavLinks />
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};
