
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SupplyChainStage } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface SupplyChainMapProps {
  stages: SupplyChainStage[];
  className?: string;
}

const SupplyChainMap = ({ stages, className }: SupplyChainMapProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-blue-500";
      case "Pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Supply Chain Journey</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200"></div>
          <div className="space-y-6">
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <div key={stage.id} className="relative flex items-start pl-10">
                  <div
                    className={cn(
                      "absolute left-1 top-1 h-6 w-6 rounded-full flex items-center justify-center border-2 border-white",
                      getStatusColor(stage.status)
                    )}
                  >
                    <Icon className="h-3 w-3 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h4 className="text-sm font-medium">{stage.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {stage.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stage.location}
                    </p>
                    {stage.details && (
                      <p className="text-xs mt-1 text-muted-foreground">{stage.details}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SupplyChainMap;
