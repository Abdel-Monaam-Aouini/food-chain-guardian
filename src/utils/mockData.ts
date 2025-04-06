
import { 
  Barcode, 
  BoxIcon, 
  Truck, 
  Store, 
  UtensilsCrossed, 
  ShoppingBasket, 
  Leaf, 
  MapPin, 
  CalendarDays, 
  CheckCircle2 
} from "lucide-react";

export type ProductType = {
  id: string;
  name: string;
  category: string;
  image: string;
  origin: string;
  producer: string;
  harvestDate: string;
  certifications: string[];
  status: 'Verified' | 'In Transit' | 'Processing';
  supplyChain: SupplyChainStage[];
};

export type SupplyChainStage = {
  id: number;
  name: string;
  location: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  icon: any; // Lucide icon component
  details?: string;
};

export type Statistic = {
  id: number;
  title: string;
  value: string | number;
  description: string;
  change: number;
  icon: any; // Lucide icon component
};

export type Activity = {
  id: number;
  product: string;
  action: string;
  timestamp: string;
  user: string;
  details: string;
};

// Mock products data
export const products: ProductType[] = [
  {
    id: 'PRD001',
    name: 'Organic Apples',
    category: 'Fruit',
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    origin: 'Washington, USA',
    producer: 'Sunshine Orchards',
    harvestDate: '2023-09-15',
    certifications: ['Organic', 'Non-GMO'],
    status: 'Verified',
    supplyChain: [
      { 
        id: 1, 
        name: 'Harvesting', 
        location: 'Yakima Valley, WA', 
        date: '2023-09-15', 
        status: 'Completed', 
        icon: Leaf,
        details: 'Harvested at peak ripeness using sustainable practices'
      },
      { 
        id: 2, 
        name: 'Processing', 
        location: 'Yakima Processing Center', 
        date: '2023-09-16', 
        status: 'Completed', 
        icon: BoxIcon,
        details: 'Washed, sorted, and packed using eco-friendly methods'
      },
      { 
        id: 3, 
        name: 'Transport', 
        location: 'En route to Distribution Center', 
        date: '2023-09-17', 
        status: 'Completed', 
        icon: Truck,
        details: 'Transported in temperature-controlled vehicles'
      },
      { 
        id: 4, 
        name: 'Distribution', 
        location: 'Regional Distribution Center', 
        date: '2023-09-19', 
        status: 'Completed', 
        icon: Store,
        details: 'Quality checked and prepared for retail distribution'
      },
      { 
        id: 5, 
        name: 'Retail', 
        location: 'Whole Foods Market #123', 
        date: '2023-09-22', 
        status: 'Completed', 
        icon: ShoppingBasket,
        details: 'Available for consumer purchase'
      }
    ]
  },
  {
    id: 'PRD002',
    name: 'Wild Caught Salmon',
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    origin: 'Alaska, USA',
    producer: 'Northern Catch Fisheries',
    harvestDate: '2023-09-20',
    certifications: ['Sustainable Seafood', 'Wild Caught'],
    status: 'In Transit',
    supplyChain: [
      { 
        id: 1, 
        name: 'Harvesting', 
        location: 'Kodiak Island, AK', 
        date: '2023-09-20', 
        status: 'Completed', 
        icon: Leaf,
        details: 'Wild caught using sustainable fishing methods'
      },
      { 
        id: 2, 
        name: 'Processing', 
        location: 'Kodiak Processing Plant', 
        date: '2023-09-21', 
        status: 'Completed', 
        icon: BoxIcon,
        details: 'Cleaned, filleted, and flash frozen to preserve freshness'
      },
      { 
        id: 3, 
        name: 'Transport', 
        location: 'En route to Distribution Center', 
        date: '2023-09-22', 
        status: 'In Progress', 
        icon: Truck,
        details: 'Being transported in refrigerated containers'
      },
      { 
        id: 4, 
        name: 'Distribution', 
        location: 'Pacific Seafood Distribution', 
        date: '2023-09-25', 
        status: 'Pending', 
        icon: Store,
        details: 'Awaiting arrival at distribution center'
      },
      { 
        id: 5, 
        name: 'Retail', 
        location: 'Various Retailers', 
        date: '2023-09-28', 
        status: 'Pending', 
        icon: ShoppingBasket,
        details: 'Not yet available for consumer purchase'
      }
    ]
  },
  {
    id: 'PRD003',
    name: 'Artisan Sourdough Bread',
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1585478259715-1c195a3c012f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    origin: 'San Francisco, USA',
    producer: 'Urban Bakehouse',
    harvestDate: '2023-09-21',
    certifications: ['Artisan', 'No Additives'],
    status: 'Processing',
    supplyChain: [
      { 
        id: 1, 
        name: 'Ingredient Sourcing', 
        location: 'Multiple Organic Farms', 
        date: '2023-09-18', 
        status: 'Completed', 
        icon: Leaf,
        details: 'Organic flour, sea salt, and natural starter culture'
      },
      { 
        id: 2, 
        name: 'Baking', 
        location: 'San Francisco Bakery', 
        date: '2023-09-21', 
        status: 'Completed', 
        icon: UtensilsCrossed,
        details: 'Crafted by hand and baked in traditional stone ovens'
      },
      { 
        id: 3, 
        name: 'Processing', 
        location: 'Bakery Packaging Facility', 
        date: '2023-09-21', 
        status: 'In Progress', 
        icon: BoxIcon,
        details: 'Being packaged in eco-friendly materials'
      },
      { 
        id: 4, 
        name: 'Transport', 
        location: 'Local Delivery Routes', 
        date: '2023-09-22', 
        status: 'Pending', 
        icon: Truck,
        details: 'Will be delivered to local shops and farmers markets'
      },
      { 
        id: 5, 
        name: 'Retail', 
        location: 'Various Local Shops', 
        date: '2023-09-22', 
        status: 'Pending', 
        icon: ShoppingBasket,
        details: 'Not yet available for purchase'
      }
    ]
  }
];

// Mock statistics
export const statistics: Statistic[] = [
  { 
    id: 1, 
    title: 'Total Products', 
    value: 1458, 
    description: 'Active products in the system', 
    change: 12.5, 
    icon: Barcode 
  },
  { 
    id: 2, 
    title: 'Verified Sources', 
    value: 286, 
    description: 'Verified suppliers and producers', 
    change: 8.3, 
    icon: CheckCircle2 
  },
  { 
    id: 3, 
    title: 'Supply Chain Points', 
    value: 4213, 
    description: 'Total tracked checkpoints', 
    change: 23.1, 
    icon: MapPin 
  },
  { 
    id: 4, 
    title: 'Average Time to Market', 
    value: '6.2 days', 
    description: 'From producer to retailer', 
    change: -4.5, 
    icon: CalendarDays 
  }
];

// Mock recent activity
export const recentActivity: Activity[] = [
  { 
    id: 1, 
    product: 'Organic Apples (PRD001)', 
    action: 'Retail Arrival', 
    timestamp: '2 hours ago', 
    user: 'System', 
    details: 'Product arrived at Whole Foods Market #123' 
  },
  { 
    id: 2, 
    product: 'Wild Caught Salmon (PRD002)', 
    action: 'Transport Update', 
    timestamp: '4 hours ago', 
    user: 'Logistics Module', 
    details: 'Shipment passed quality check in Seattle distribution hub' 
  },
  { 
    id: 3, 
    product: 'Artisan Sourdough Bread (PRD003)', 
    action: 'Processing Started', 
    timestamp: '6 hours ago', 
    user: 'Production Manager', 
    details: 'Batch #45289 entered packaging phase' 
  },
  { 
    id: 4, 
    product: 'Organic Kale (PRD042)', 
    action: 'Certification Updated', 
    timestamp: '1 day ago', 
    user: 'Compliance Team', 
    details: 'USDA Organic certification renewed' 
  },
  { 
    id: 5, 
    product: 'Grass-Fed Beef (PRD018)', 
    action: 'QR Code Generated', 
    timestamp: '1 day ago', 
    user: 'System', 
    details: 'New batch QR codes generated for retail packaging' 
  }
];
