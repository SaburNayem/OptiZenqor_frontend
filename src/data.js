export const categories = [
  { id: "beauty_personal_care", name: "Beauty & Personal Care", icon: "Spa", bannerTitle: "Beauty & Personal Care" },
  { id: "books_stationary", name: "Books & Stationary", icon: "MenuBook", bannerTitle: "Books & Stationary" },
  { id: "electronics_gadget", name: "Electronics & Gadget", icon: "Devices", bannerTitle: "Electronics & Gadget" },
  { id: "fashion_clothing", name: "Fashion & Clothing", icon: "Checkroom", bannerTitle: "Fashion & Clothing" },
  { id: "groceries_food", name: "Groceries & Food", icon: "Fastfood", bannerTitle: "Groceries & Food" },
  { id: "health_wellness", name: "Health & Wellness", icon: "HealthAndSafety", bannerTitle: "Health & Wellness" },
  { id: "home_living", name: "Home & Living", icon: "Chair", bannerTitle: "Home & Living" },
  { id: "sports_outdoor", name: "Sports & Outdoor", icon: "SportsBasketball", bannerTitle: "Sports & Outdoor" },
  { id: "toy_babies_product", name: "Toy & Babies", icon: "Toys", bannerTitle: "Toy & Babies Product" },
];

export const products = [
  {
    id: "p1",
    name: "Urban Laptop",
    categoryId: "electronics_gadget",
    categoryName: "Electronics & Gadget",
    price: 20,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80",
    description: "A lightweight productivity laptop inspired by the original shop app's featured products.",
  },
  {
    id: "p2",
    name: "Studio Headphones",
    categoryId: "electronics_gadget",
    categoryName: "Electronics & Gadget",
    price: 25,
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    description: "Comfortable over-ear headphones for work sessions, media, and focused listening.",
  },
  {
    id: "p3",
    name: "Classic Jacket",
    categoryId: "fashion_clothing",
    categoryName: "Fashion & Clothing",
    price: 30,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    description: "A premium layer with a sharp silhouette and all-day comfort.",
  },
  {
    id: "p4",
    name: "Face Cleanser",
    categoryId: "beauty_personal_care",
    categoryName: "Beauty & Personal Care",
    price: 15,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
    description: "A gentle cleanser designed for everyday use and a fresh morning routine.",
  },
  {
    id: "p5",
    name: "Shampoo",
    categoryId: "beauty_personal_care",
    categoryName: "Beauty & Personal Care",
    price: 20,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
    description: "A salon-style wash that leaves hair smooth and refreshed.",
  },
  {
    id: "p6",
    name: "Lipstick",
    categoryId: "beauty_personal_care",
    categoryName: "Beauty & Personal Care",
    price: 10,
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    description: "A bold daily-wear color with a soft matte finish.",
  },
  {
    id: "p7",
    name: "Perfume",
    categoryId: "beauty_personal_care",
    categoryName: "Beauty & Personal Care",
    price: 35,
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80",
    description: "A clean floral scent that feels polished without being overpowering.",
  },
  {
    id: "p8",
    name: "Desk Lamp",
    categoryId: "home_living",
    categoryName: "Home & Living",
    price: 18,
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
    description: "Warm ambient lighting for study corners, desks, and bedside setups.",
  },
  {
    id: "p9",
    name: "Fitness Bottle",
    categoryId: "sports_outdoor",
    categoryName: "Sports & Outdoor",
    price: 12,
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    description: "A durable companion for workouts, walking, and everyday hydration.",
  },
  {
    id: "p10",
    name: "Notebook Set",
    categoryId: "books_stationary",
    categoryName: "Books & Stationary",
    price: 14,
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    description: "Minimal notebooks made for planning, journaling, and neat daily lists.",
  },
  {
    id: "p11",
    name: "Organic Snacks",
    categoryId: "groceries_food",
    categoryName: "Groceries & Food",
    price: 9,
    rating: 4.1,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    description: "Healthy snack packs for quick breaks between work and study.",
  },
  {
    id: "p12",
    name: "Wellness Kit",
    categoryId: "health_wellness",
    categoryName: "Health & Wellness",
    price: 28,
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
    description: "A compact self-care bundle with practical daily essentials.",
  },
];

export const featuredProducts = products.slice(0, 4);
export const popularProducts = products.slice(4, 8);
export const favoriteSeed = [products[1], products[3], products[6]];
export const cartSeed = [
  { product: products[0], quantity: 1 },
  { product: products[6], quantity: 2 },
];

export const accountActions = [
  { title: "Personal Details", subtitle: "Update profile information and photo" },
  { title: "My Order", subtitle: "Track current orders and expected delivery" },
  { title: "Delivery Address", subtitle: "Manage saved shipping addresses" },
  { title: "Order History", subtitle: "See your previous purchases" },
  { title: "Payment Methods", subtitle: "Add cards and preferred payment options" },
  { title: "Support", subtitle: "Get help with your account and checkout" },
];

export const drawerItems = [
  "Order History",
  "Support",
  "Review",
  "Help",
  "About Us",
  "Logout",
];

export const offerTabs = [
  "Free Delivery",
  "Flash Sell",
  "Buy Get",
  "Must Buy",
  "Best Price",
  "Mega Discount",
  "Free Gift",
];

export const homeHighlights = [
  "Fast delivery across major cities",
  "Original product-focused shopping flow from your existing app",
  "Clean teal brand palette carried over into React",
];

export function getProductsByCategory(categoryId) {
  return products.filter((product) => product.categoryId === categoryId);
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
