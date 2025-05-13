
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Drugs from "./pages/Drugs";
import Calculators from "./pages/Calculators";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/drugs" element={<Drugs />} />
          <Route path="/calculators" element={<Calculators />} />
          {/* The following routes will be implemented in future iterations */}
          <Route path="/diagnoses" element={<NotFound />} />
          <Route path="/guidelines" element={<NotFound />} />
          <Route path="/vitals" element={<NotFound />} />
          <Route path="/notes" element={<NotFound />} />
          <Route path="/help" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
