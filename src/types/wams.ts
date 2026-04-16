export interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  threshold: number;
  price: number;
  unit: string;
}

export interface RawMaterial {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  unit: string;
  supplierId?: string;
}

export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  status: "active" | "inactive";
}

export interface Order {
  id: string;
  dealerId: string;
  dealerName: string;
  items: OrderItem[];
  status: "pending" | "quoted" | "approved" | "in_production" | "shipped" | "delivered" | "rejected";
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  materials: string[];
  address: string;
}

export interface Quotation {
  id: string;
  supplierId: string;
  supplierName: string;
  materialId: string;
  materialName: string;
  price: number;
  deliveryDays: number;
  quantity: number;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export interface Invoice {
  id: string;
  orderId: string;
  dealerName: string;
  amount: number;
  tax: number;
  totalAmount: number;
  status: "pending" | "paid" | "overdue";
  createdAt: string;
  dueDate: string;
}

export interface Transaction {
  id: string;
  invoiceId: string;
  amount: number;
  type: "payment" | "refund";
  status: "completed" | "pending" | "failed";
  createdAt: string;
}

export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  units: number;
}

export interface Notification {
  id: string;
  type: "low_stock" | "new_order" | "payment" | "shipment";
  message: string;
  read: boolean;
  createdAt: string;
}
