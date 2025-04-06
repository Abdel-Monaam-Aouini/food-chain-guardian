
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Activity } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  activities: Activity[];
  className?: string;
}

const RecentActivity = ({ activities, className }: RecentActivityProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="border-b border-gray-100 pb-4">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{activity.action}</h4>
                <span className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
              <p className="text-xs text-guardian-blue-600 mt-1">
                {activity.product}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {activity.details}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
