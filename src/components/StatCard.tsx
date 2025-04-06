
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  change: number;
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon: Icon,
  change,
  className,
}: StatCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className={cn("card-hover", className)}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <Icon className="h-5 w-5 text-guardian-green-500" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div
            className={cn(
              "flex items-center text-xs font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            <span>
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
