
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, MapPin, Calendar, ArrowRight } from "lucide-react";
import { type ProductType } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-blue-100 text-blue-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className={cn("overflow-hidden card-hover", className)}>
      <div className="h-48 overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Badge 
          className={cn(
            "absolute top-2 right-2",
            getStatusColor(product.status)
          )}
        >
          {product.status}
        </Badge>
      </div>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-guardian-green-500" />
            <span>{product.origin}</span>
          </div>
          <div className="flex items-center">
            <Info className="h-4 w-4 mr-2 text-guardian-green-500" />
            <span>{product.producer}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-guardian-green-500" />
            <span>Harvested: {new Date(product.harvestDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1">
          {product.certifications.map((cert, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-guardian-green-50 text-guardian-green-700 border-guardian-green-200"
            >
              {cert}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full justify-between text-guardian-blue-500"
        >
          Track Journey
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
