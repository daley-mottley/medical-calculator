
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/ui/StatCard";
import { RecentActivity } from "@/components/home/RecentActivity";
import { DrugInteractions } from "@/components/home/DrugInteractions";
import { QuickCalculators } from "@/components/home/QuickCalculators";
import { Book, Heart, Pill, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Reynolds. Here's your medical assistant.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Drug References"
          value="28"
          icon={<Pill className="w-4 h-4" />}
          description="Most viewed: Metoprolol"
          trend={{ value: 12, positive: true }}
        />
        <StatCard
          title="Calculations"
          value="16"
          icon={<Heart className="w-4 h-4" />}
          description="Most used: eGFR Calculator"
          trend={{ value: 8, positive: true }}
        />
        <StatCard
          title="Clinical Guidelines"
          value="9"
          icon={<Book className="w-4 h-4" />}
          description="Recently: Hypertension"
          trend={{ value: 4, positive: true }}
        />
        <StatCard
          title="Diagnoses Checked"
          value="5"
          icon={<Stethoscope className="w-4 h-4" />}
          description="Today's activity"
          trend={{ value: 2, positive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <DrugInteractions />
        <QuickCalculators />
        <div className="lg:col-span-1 md:col-span-2">
          <RecentActivity />
        </div>
      </div>

      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-medium text-lg">Quick Patient Notes</h3>
            <p className="text-sm text-muted-foreground">
              Create standardized notes with customizable templates
            </p>
          </div>
          <Button className="bg-medical-primary hover:bg-medical-secondary w-full md:w-auto">
            Create New Note
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
