export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  isActive: boolean;
  features?: {
    material?: string;
    care?: string;
    origin?: string;
  };
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product | null;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
  };
  delivery: {
    address: string;
    city: string;
    wilaya: string;
    postalCode: string;
    notes?: string;
  };
  items: CartItem[];
  total: number;
  status: 'en attente' | 'confirmé' | 'expédiée' | 'livrée' | 'annulée';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  role: 'admin' | 'client';
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  search?: string;
}

export interface Wilaya {
  code: string;
  name: string;
  nameAr: string;
}


