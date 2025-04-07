
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { products } from "@/utils/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Search, 
  QrCode, 
  ArrowUpDown, 
  Filter,
  X
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";

const Products = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all-categories",
    status: "all-statuses",
    producer: "all-producers",
    origin: "all-origins",
    dateRange: [0, 100] // Represents a percentage range for dates
  });
  
  // Extract unique values for filters
  const categories = [...new Set(products.map(p => p.category))];
  const statuses = [...new Set(products.map(p => p.status))];
  const producers = [...new Set(products.map(p => p.producer))];
  const origins = [...new Set(products.map(p => p.origin))];
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      category: "all-categories",
      status: "all-statuses",
      producer: "all-producers",
      origin: "all-origins",
      dateRange: [0, 100]
    });
  };
  
  const filteredProducts = products.filter(product => {
    // Apply search query filter
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.producer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = filters.category === "all-categories" || product.category === filters.category;
    
    // Apply status filter
    const matchesStatus = filters.status === "all-statuses" || product.status === filters.status;
    
    // Apply producer filter
    const matchesProducer = filters.producer === "all-producers" || product.producer === filters.producer;
    
    // Apply origin filter
    const matchesOrigin = filters.origin === "all-origins" || product.origin === filters.origin;
    
    // Apply date range filter (simplified for demo)
    // This assumes harvest dates are in format MM/DD/YYYY
    const matchesDateRange = true; // Simplified for this implementation
    
    return matchesSearch && matchesCategory && matchesStatus && 
           matchesProducer && matchesOrigin && matchesDateRange;
  });

  const activeFilterCount = Object.values(filters).filter(val => {
    if (Array.isArray(val)) {
      return val[0] !== 0 || val[1] !== 100;
    }
    return val !== "all-categories" && val !== "all-statuses" && 
           val !== "all-producers" && val !== "all-origins";
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-1 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-2xl font-bold">All Products</h1>
          </div>
          
          <Button 
            className="mt-2 sm:mt-0 bg-guardian-green-500 hover:bg-guardian-green-600 text-white flex items-center gap-2"
            onClick={() => navigate("/add-product")}
          >
            <QrCode className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 relative"
                    onClick={() => setFiltersOpen(true)}
                  >
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-guardian-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Filters</h3>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={resetFilters}
                        className="h-8 px-2 text-muted-foreground"
                      >
                        Reset
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => handleFilterChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-categories">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={filters.status}
                        onValueChange={(value) => handleFilterChange("status", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-statuses">All Statuses</SelectItem>
                          {statuses.map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Producer</label>
                      <Select
                        value={filters.producer}
                        onValueChange={(value) => handleFilterChange("producer", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Producers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-producers">All Producers</SelectItem>
                          {producers.map((producer) => (
                            <SelectItem key={producer} value={producer}>
                              {producer}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Origin</label>
                      <Select
                        value={filters.origin}
                        onValueChange={(value) => handleFilterChange("origin", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Origins" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-origins">All Origins</SelectItem>
                          {origins.map((origin) => (
                            <SelectItem key={origin} value={origin}>
                              {origin}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        className="w-full bg-guardian-green-500 hover:bg-guardian-green-600"
                        onClick={() => setFiltersOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {filters.category !== "all-categories" && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>Category: {filters.category}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => handleFilterChange("category", "all-categories")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {filters.status !== "all-statuses" && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>Status: {filters.status}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => handleFilterChange("status", "all-statuses")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {filters.producer !== "all-producers" && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>Producer: {filters.producer}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => handleFilterChange("producer", "all-producers")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                {filters.origin !== "all-origins" && (
                  <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
                    <span>Origin: {filters.origin}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 ml-1"
                      onClick={() => handleFilterChange("origin", "all-origins")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-guardian-green-600 h-7 px-3 py-1"
                >
                  Clear All
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Product Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>
                    <div className="flex items-center">
                      Product
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Producer</TableHead>
                  <TableHead className="hidden lg:table-cell">Origin</TableHead>
                  <TableHead className="hidden lg:table-cell">Harvest Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{product.producer}</TableCell>
                      <TableCell className="hidden lg:table-cell">{product.origin}</TableCell>
                      <TableCell className="hidden lg:table-cell">{product.harvestDate}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                          ${product.status === 'Verified' ? 'bg-green-100 text-green-800' : 
                            product.status === 'In Transit' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {product.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-guardian-blue-500"
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      No products found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Products;
