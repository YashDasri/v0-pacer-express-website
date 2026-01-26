export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "snacks" | "groceries" | "academic" | "daily";
  image: string;
}

export const products: Product[] = [
  // Snacks
  {
    id: "1",
    name: "Doritos Nacho Cheese",
    description: "Crunchy nacho cheese tortilla chips - perfect study snack",
    price: 3.99,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1600952841320-db92ec4047ca?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Coca-Cola 20oz",
    description: "Classic Coca-Cola in a refreshing 20oz bottle",
    price: 2.49,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Kind Bar Variety",
    description: "Nutritious nut bar for healthy snacking",
    price: 2.99,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1622484212850-eb596d769eab?w=400&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Red Bull Energy",
    description: "Energy drink to power through late night studies",
    price: 3.49,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Lay's Classic Chips",
    description: "Classic salted potato chips for any occasion",
    price: 3.29,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop",
  },
  {
    id: "6",
    name: "Gatorade Blue",
    description: "Cool blue sports drink for hydration",
    price: 2.29,
    category: "snacks",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop",
  },
  // Groceries
  {
    id: "7",
    name: "Instant Ramen Pack",
    description: "Quick and easy noodles - 5 pack assorted flavors",
    price: 4.99,
    category: "groceries",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&h=300&fit=crop",
  },
  {
    id: "8",
    name: "Fresh Bananas",
    description: "Bundle of 5 fresh bananas",
    price: 1.99,
    category: "groceries",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop",
  },
  {
    id: "9",
    name: "Milk 1 Gallon",
    description: "Fresh whole milk - 1 gallon",
    price: 4.49,
    category: "groceries",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop",
  },
  {
    id: "10",
    name: "Bread Loaf",
    description: "Soft white sandwich bread",
    price: 2.99,
    category: "groceries",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop",
  },
  // Academic
  {
    id: "11",
    name: "Blue Pen 10-Pack",
    description: "Smooth writing ballpoint pens for note-taking",
    price: 4.99,
    category: "academic",
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop",
  },
  {
    id: "12",
    name: "Spiral Notebook",
    description: "College-ruled 100 page spiral notebook",
    price: 3.49,
    category: "academic",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop",
  },
  {
    id: "13",
    name: "Highlighter Set",
    description: "Assorted color highlighters - 5 pack",
    price: 5.99,
    category: "academic",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
  },
  {
    id: "14",
    name: "USB Flash Drive 32GB",
    description: "Portable storage for assignments and projects",
    price: 9.99,
    category: "academic",
    image: "https://images.unsplash.com/photo-1597673030062-0a0f1a801a31?w=400&h=300&fit=crop",
  },
  {
    id: "15",
    name: "Index Cards 100pk",
    description: "Lined index cards for studying and flashcards",
    price: 2.99,
    category: "academic",
    image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400&h=300&fit=crop",
  },
  // Daily
  {
    id: "16",
    name: "Hand Sanitizer",
    description: "Portable hand sanitizer - 8oz bottle",
    price: 3.99,
    category: "daily",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=400&h=300&fit=crop",
  },
  {
    id: "17",
    name: "Tissues Box",
    description: "Soft facial tissues - 200 count",
    price: 2.49,
    category: "daily",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop",
  },
  {
    id: "18",
    name: "Phone Charger",
    description: "Universal USB-C fast charger cable",
    price: 12.99,
    category: "daily",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=300&fit=crop",
  },
  {
    id: "19",
    name: "Toothpaste",
    description: "Mint fresh toothpaste - 6oz tube",
    price: 3.49,
    category: "daily",
    image: "https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=400&h=300&fit=crop",
  },
  {
    id: "20",
    name: "Deodorant",
    description: "24-hour protection deodorant stick",
    price: 4.99,
    category: "daily",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=300&fit=crop",
  },
];

export const categories = [
  { id: "all", name: "All", icon: "ShoppingCart" },
  { id: "snacks", name: "Snacks", icon: "Cookie" },
  { id: "groceries", name: "Groceries", icon: "Apple" },
  { id: "academic", name: "Academic", icon: "BookOpen" },
  { id: "daily", name: "Daily", icon: "Droplet" },
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
