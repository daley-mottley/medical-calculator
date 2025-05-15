
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Drugs from "./pages/Drugs";
import Calculators from "./pages/Calculators";
import NotFound from "./pages/NotFound";
import PatientNotesPage from "./pages/PatientNotes";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute"; // Import ProtectedRoute

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Index />} />
            <Route path="/drugs" element={<Drugs />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notes" element={<PatientNotesPage />} />
            {/* The following routes will be implemented in future iterations */}
            <Route path="/diagnoses" element={<NotFound />} />
            <Route path="/guidelines" element={<NotFound />} />
            <Route path="/vitals" element={<NotFound />} />
            <Route path="/help" element={<NotFound />} />
          </Route>

          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
