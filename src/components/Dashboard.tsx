
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, statistics, recentActivity } from "@/utils/mockData";
import StatCard from "./StatCard";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import SupplyChainMap from "./SupplyChainMap";
import RecentActivity from "./RecentActivity";
import { Button } from "@/components/ui/button";
import { QrCode, Filter, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const navigate = useNavigate();

  const handleProductClick = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handleViewProduct = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Food Traceability Dashboard</h1>
          <p className="text-muted-foreground">
            Track, verify, and manage your food supply chain
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-guardian-green-200 text-guardian-green-700 hover:bg-guardian-green-50"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button 
            className="bg-guardian-green-500 hover:bg-guardian-green-600 text-white flex items-center gap-2"
            onClick={() => navigate("/add-product")}
          >
            <QrCode className="h-4 w-4" />
            <span>New Scan</span>
          </Button>
        </div>
      </div>

      <SearchBar className="animate-fade-in" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-slide-in">
        {statistics.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recently Added Products</CardTitle>
                <Button 
                  variant="ghost" 
                  className="text-sm text-guardian-blue-500 flex items-center gap-1"
                  onClick={() => navigate("/products")}
                >
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="cursor-pointer transition-all"
                    onClick={() => handleProductClick(product.id)}
                  >
                    <ProductCard 
                      product={product}
                      className="h-full"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2 text-guardian-blue-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProduct(product.id);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <RecentActivity activities={recentActivity} className="animate-fade-in" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <SupplyChainMap stages={selectedProduct.supplyChain} className="animate-fade-in" />
        </div>
        <div>
          <Card className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProduct.category}</p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-2">Producer Information</h4>
                  <p className="text-sm">{selectedProduct.producer}</p>
                  <p className="text-sm text-muted-foreground">{selectedProduct.origin}</p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-2">Certifications</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedProduct.certifications.map((cert, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-guardian-green-100 text-guardian-green-800"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <h4 className="text-sm font-medium mb-2">Status</h4>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                    ${selectedProduct.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                      selectedProduct.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {selectedProduct.status}
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <Button 
                    className="w-full bg-guardian-blue-500 hover:bg-guardian-blue-600 text-white mt-2"
                    onClick={() => handleViewProduct(selectedProduct.id)}
                  >
                    View Complete History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
