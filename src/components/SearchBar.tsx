
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, QrCode } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // Implement search functionality here
  };

  return (
    <Card className={cn("bg-white p-4", className)}>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product ID, name, or producer..."
            className="pl-10 w-full"
          />
        </div>
        <Button 
          type="submit" 
          className="bg-guardian-green-500 hover:bg-guardian-green-600 text-white"
        >
          Search
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center gap-2 border-guardian-green-200 text-guardian-green-700 hover:bg-guardian-green-50"
        >
          <QrCode className="h-4 w-4" />
          <span className="hidden sm:inline">Scan QR Code</span>
        </Button>
      </form>
    </Card>
  );
};

export default SearchBar;
