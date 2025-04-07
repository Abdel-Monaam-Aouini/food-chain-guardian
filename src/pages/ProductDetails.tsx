
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "@/utils/mockData";
import { type ProductType } from "@/utils/mockData";
import NavBar from "@/components/NavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Barcode, User2, CheckCircle2 } from "lucide-react";
import SupplyChainMap from "@/components/SupplyChainMap";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <NavBar />
        <main className="flex-1 p-6">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold">Product not found</h2>
            <Button 
              className="mt-4 bg-guardian-green-500" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${product.status === 'Verified' ? 'bg-green-100 text-green-800' : 
              product.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
              'bg-yellow-100 text-yellow-800'}`}
          >
            {product.status}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <div className="aspect-w-16 aspect-h-9 rounded-t-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Barcode className="h-5 w-5 text-guardian-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Product ID</p>
                      <p className="text-sm">{product.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <User2 className="h-5 w-5 text-guardian-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Producer</p>
                      <p className="text-sm">{product.producer}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-guardian-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Origin</p>
                      <p className="text-sm">{product.origin}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-guardian-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Harvest Date</p>
                      <p className="text-sm">{product.harvestDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-guardian-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Certifications</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.certifications.map((cert, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-guardian-green-100 text-guardian-green-800"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <SupplyChainMap stages={product.supplyChain} className="animate-fade-in" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stage Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {product.supplyChain.map((stage) => {
                    const StageIcon = stage.icon;
                    return (
                      <div key={stage.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-md mr-4 ${
                            stage.status === 'Completed' ? 'bg-green-100' : 
                            stage.status === 'In Progress' ? 'bg-blue-100' : 'bg-yellow-100'
                          }`}>
                            <StageIcon className={`h-5 w-5 ${
                              stage.status === 'Completed' ? 'text-green-600' : 
                              stage.status === 'In Progress' ? 'text-blue-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium text-base">{stage.name}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                stage.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                stage.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {stage.status}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{stage.location}</p>
                            <p className="text-sm text-gray-500">{stage.date}</p>
                            {stage.details && (
                              <p className="mt-2 text-sm">{stage.details}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
