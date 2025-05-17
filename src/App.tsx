import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Calculators from "./pages/Calculators";
import SavedCalculationsPage from "./pages/SavedCalculationsPage";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
            {/* Set the root path to Calculators */}
            <Route path="/" element={<Navigate to="/calculators" replace />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/saved-calculations" element={<SavedCalculationsPage />} /> {/* Add route for SavedCalculationsPage */}
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all Route - Redirect to calculators */}
          <Route path="*" element={<Navigate to="/calculators" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
