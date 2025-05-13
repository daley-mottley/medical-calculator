
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ActivityItem {
  id: string;
  title: string;
  time: string;
  description: string;
  category: 'drug' | 'calculator' | 'note';
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    title: 'Metoprolol Drug Reference',
    time: '10 minutes ago',
    description: 'Checked dosing information for hypertension',
    category: 'drug'
  },
  {
    id: '2',
    title: 'eGFR Calculator',
    time: '1 hour ago',
    description: 'Calculated for patient #12458',
    category: 'calculator'
  },
  {
    id: '3',
    title: 'Progress Note - John D.',
    time: '2 hours ago',
    description: 'Updated treatment plan for diabetes management',
    category: 'note'
  },
  {
    id: '4',
    title: 'Warfarin Interaction Check',
    time: '3 hours ago',
    description: 'Checked interaction with amoxicillin',
    category: 'drug'
  },
  {
    id: '5',
    title: 'BMI Calculator',
    time: '5 hours ago',
    description: 'Calculated for patient #10932',
    category: 'calculator'
  },
];

export function RecentActivity() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent references and calculations</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ScrollArea className="h-[280px] px-6">
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                <div className="rounded-full p-2 bg-medical-soft">
                  {activity.category === 'drug' && (
                    <div className="w-3 h-3 bg-medical-primary rounded-full" />
                  )}
                  {activity.category === 'calculator' && (
                    <div className="w-3 h-3 bg-medical-accent rounded-full" />
                  )}
                  {activity.category === 'note' && (
                    <div className="w-3 h-3 bg-medical-secondary rounded-full" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="font-medium">{activity.title}</div>
                  <div className="text-sm text-muted-foreground">{activity.description}</div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
