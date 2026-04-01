export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "pacer-market" | "station" | "starbucks" | "grocery" | "pacer-store";
  image: string;
}

export const products: Product[] = [
  // Pacer Market
  {
    id: "1",
    name: "Doritos Nacho Cheese",
    description: "Crunchy nacho cheese tortilla chips - perfect study snack",
    price: 3.99,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Coca-Cola 20oz",
    description: "Classic Coca-Cola in a refreshing 20oz bottle",
    price: 2.49,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Kind Bar Variety",
    description: "Nutritious nut bar for healthy snacking",
    price: 2.99,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1622484212850-eb596d769eab?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Red Bull Energy",
    description: "Energy drink to power through late night studies",
    price: 3.49,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Lay's Classic Chips",
    description: "Classic salted potato chips for any occasion",
    price: 3.29,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Gatorade Blue",
    description: "Cool blue sports drink for hydration",
    price: 2.29,
    category: "pacer-market",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop",
  },

  // Grocery
  {
    id: "7",
    name: "Instant Ramen Pack",
    description: "Quick and easy noodles - 5 pack assorted flavors",
    price: 4.99,
    category: "grocery",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Fresh Bananas",
    description: "Bundle of 5 fresh bananas",
    price: 1.99,
    category: "grocery",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Milk 1 Gallon",
    description: "Fresh whole milk - 1 gallon",
    price: 4.49,
    category: "grocery",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "Bread Loaf",
    description: "Soft white sandwich bread",
    price: 2.99,
    category: "grocery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  },

  // Station
  {
    id: "11",
    name: "Blue Pen 10-Pack",
    description: "Smooth writing ballpoint pens for note-taking",
    price: 4.99,
    category: "station",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Spiral Notebook",
    description: "College-ruled 100 page spiral notebook",
    price: 3.49,
    category: "station",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop",
  },
  {
    id: "13",
    name: "Highlighter Set",
    description: "Assorted color highlighters - 5 pack",
    price: 5.99,
    category: "station",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
  },
  {
    id: "14",
    name: "USB Flash Drive 32GB",
    description: "Portable storage for assignments and projects",
    price: 9.99,
    category: "station",
    image: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=400&h=300&fit=crop",
  },
  {
    id: "15",
    name: "Index Cards 100pk",
    description: "Lined index cards for studying and flashcards",
    price: 2.99,
    category: "station",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400&h=300&fit=crop",
  },

  // Starbucks
  {
    id: "16",
    name: "Starbucks Caffè Latte",
    description: "Freshly brewed espresso with steamed milk",
    price: 5.49,
    category: "starbucks",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
  },
  {
    id: "17",
    name: "Starbucks Caramel Frappuccino",
    description: "Blended coffee drink with caramel drizzle",
    price: 6.29,
    category: "starbucks",
    image: "https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&h=300&fit=crop",
  },

  // Pacer Store
  {
    id: "18",
    name: "Pacer Hoodie",
    description: "Official USCA Pacer hoodie",
    price: 34.99,
    category: "pacer-store",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
  },
  {
    id: "19",
    name: "Pacer Water Bottle",
    description: "Insulated Pacer-branded bottle",
    price: 19.99,
    category: "pacer-store",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop",
  },
  {
    id: "20",
    name: "Pacer Cap",
    description: "Classic cap with embroidered Pacer logo",
    price: 16.99,
    category: "pacer-store",
    image: "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=400&h=300&fit=crop",
  },
];

export const categories = [
  { id: "pacer-market", name: "Pacer Market", icon: "Store" },
  { id: "station", name: "Station", icon: "NotebookPen" },
  { id: "starbucks", name: "Starbucks", icon: "Coffee" },
  { id: "grocery", name: "Grocery", icon: "Apple" },
  { id: "pacer-store", name: "Pacer Store", icon: "ShoppingBag" },
] as const;

export const campusLocations = [
  "Student Activity Center",
  "Pacer Commons",
  "Science Building",
  "Business Building",
  "Humanities Building",
  "Library",
  "Etherredge Center",
  "Convocation Center",
  "Athletic Complex",
  "Penland Building",
];
