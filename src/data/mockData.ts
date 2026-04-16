import { Product, RawMaterial, Dealer, Order, Supplier, Quotation, Invoice, Transaction, SalesData, Notification } from "@/types/wams";

export const products: Product[] = [
  { id: "P001", name: "Industrial Motor A200", category: "Motors", quantity: 45, threshold: 20, price: 1250, unit: "pcs" },
  { id: "P002", name: "Hydraulic Pump HP-50", category: "Pumps", quantity: 12, threshold: 15, price: 3400, unit: "pcs" },
  { id: "P003", name: "Steel Gear Set SG-100", category: "Gears", quantity: 150, threshold: 50, price: 450, unit: "sets" },
  { id: "P004", name: "Control Panel CP-X1", category: "Electronics", quantity: 8, threshold: 10, price: 5600, unit: "pcs" },
  { id: "P005", name: "Conveyor Belt CB-300", category: "Belts", quantity: 30, threshold: 10, price: 2100, unit: "rolls" },
  { id: "P006", name: "Pneumatic Valve PV-20", category: "Valves", quantity: 65, threshold: 25, price: 780, unit: "pcs" },
];

export const rawMaterials: RawMaterial[] = [
  { id: "RM001", name: "Steel Sheet (2mm)", quantity: 500, threshold: 200, unit: "sheets" },
  { id: "RM002", name: "Copper Wire (1.5mm)", quantity: 120, threshold: 100, unit: "kg" },
  { id: "RM003", name: "Aluminum Rod (10mm)", quantity: 80, threshold: 50, unit: "pcs" },
  { id: "RM004", name: "Rubber Gasket Mix", quantity: 45, threshold: 30, unit: "kg" },
  { id: "RM005", name: "Electronic Components Kit", quantity: 15, threshold: 20, unit: "kits" },
];

export const dealers: Dealer[] = [
  { id: "D001", name: "Rajesh Kumar", email: "rajesh@techparts.in", phone: "+91 98765 43210", company: "TechParts India", address: "Mumbai, Maharashtra", status: "active" },
  { id: "D002", name: "Anita Sharma", email: "anita@indmach.com", phone: "+91 87654 32109", company: "IndMach Solutions", address: "Delhi, NCR", status: "active" },
  { id: "D003", name: "Vikram Singh", email: "vikram@heavyind.co", phone: "+91 76543 21098", company: "Heavy Industries Co", address: "Pune, Maharashtra", status: "active" },
  { id: "D004", name: "Priya Patel", email: "priya@autozone.in", phone: "+91 65432 10987", company: "AutoZone Enterprises", address: "Ahmedabad, Gujarat", status: "inactive" },
];

export const orders: Order[] = [
  { id: "ORD-2024-001", dealerId: "D001", dealerName: "TechParts India", items: [{ productId: "P001", productName: "Industrial Motor A200", quantity: 5, unitPrice: 1250 }], status: "approved", totalAmount: 6250, createdAt: "2026-03-15", updatedAt: "2026-03-18" },
  { id: "ORD-2024-002", dealerId: "D002", dealerName: "IndMach Solutions", items: [{ productId: "P002", productName: "Hydraulic Pump HP-50", quantity: 3, unitPrice: 3400 }, { productId: "P003", productName: "Steel Gear Set SG-100", quantity: 10, unitPrice: 450 }], status: "in_production", totalAmount: 14700, createdAt: "2026-03-20", updatedAt: "2026-03-22" },
  { id: "ORD-2024-003", dealerId: "D003", dealerName: "Heavy Industries Co", items: [{ productId: "P004", productName: "Control Panel CP-X1", quantity: 2, unitPrice: 5600 }], status: "pending", totalAmount: 11200, createdAt: "2026-04-01", updatedAt: "2026-04-01" },
  { id: "ORD-2024-004", dealerId: "D001", dealerName: "TechParts India", items: [{ productId: "P006", productName: "Pneumatic Valve PV-20", quantity: 20, unitPrice: 780 }], status: "shipped", totalAmount: 15600, createdAt: "2026-03-10", updatedAt: "2026-04-05" },
  { id: "ORD-2024-005", dealerId: "D002", dealerName: "IndMach Solutions", items: [{ productId: "P005", productName: "Conveyor Belt CB-300", quantity: 5, unitPrice: 2100 }], status: "delivered", totalAmount: 10500, createdAt: "2026-02-28", updatedAt: "2026-03-15" },
];

export const suppliers: Supplier[] = [
  { id: "S001", name: "SteelMax Industries", email: "sales@steelmax.com", phone: "+91 98111 22233", rating: 4.5, materials: ["Steel Sheet", "Aluminum Rod"], address: "Jamshedpur, Jharkhand" },
  { id: "S002", name: "ElectroCom Supplies", email: "info@electrocom.in", phone: "+91 98222 33344", rating: 4.2, materials: ["Copper Wire", "Electronic Components Kit"], address: "Bangalore, Karnataka" },
  { id: "S003", name: "RubberTech Pvt Ltd", email: "orders@rubbertech.co", phone: "+91 98333 44455", rating: 3.8, materials: ["Rubber Gasket Mix"], address: "Chennai, Tamil Nadu" },
  { id: "S004", name: "MetalWorks Corp", email: "supply@metalworks.in", phone: "+91 98444 55566", rating: 4.7, materials: ["Steel Sheet", "Aluminum Rod", "Copper Wire"], address: "Coimbatore, Tamil Nadu" },
];

export const quotations: Quotation[] = [
  { id: "Q001", supplierId: "S001", supplierName: "SteelMax Industries", materialId: "RM001", materialName: "Steel Sheet (2mm)", price: 120, deliveryDays: 7, quantity: 300, status: "accepted", createdAt: "2026-03-01" },
  { id: "Q002", supplierId: "S004", supplierName: "MetalWorks Corp", materialId: "RM001", materialName: "Steel Sheet (2mm)", price: 115, deliveryDays: 10, quantity: 300, status: "pending", createdAt: "2026-03-02" },
  { id: "Q003", supplierId: "S002", supplierName: "ElectroCom Supplies", materialId: "RM005", materialName: "Electronic Components Kit", price: 8500, deliveryDays: 5, quantity: 20, status: "pending", createdAt: "2026-04-01" },
];

export const invoices: Invoice[] = [
  { id: "INV-001", orderId: "ORD-2024-001", dealerName: "TechParts India", amount: 6250, tax: 1125, totalAmount: 7375, status: "paid", createdAt: "2026-03-18", dueDate: "2026-04-18" },
  { id: "INV-002", orderId: "ORD-2024-004", dealerName: "TechParts India", amount: 15600, tax: 2808, totalAmount: 18408, status: "pending", createdAt: "2026-04-05", dueDate: "2026-05-05" },
  { id: "INV-003", orderId: "ORD-2024-005", dealerName: "IndMach Solutions", amount: 10500, tax: 1890, totalAmount: 12390, status: "paid", createdAt: "2026-03-15", dueDate: "2026-04-15" },
  { id: "INV-004", orderId: "ORD-2024-002", dealerName: "IndMach Solutions", amount: 14700, tax: 2646, totalAmount: 17346, status: "overdue", createdAt: "2026-03-22", dueDate: "2026-04-10" },
];

export const transactions: Transaction[] = [
  { id: "TXN-001", invoiceId: "INV-001", amount: 7375, type: "payment", status: "completed", createdAt: "2026-04-10" },
  { id: "TXN-002", invoiceId: "INV-003", amount: 12390, type: "payment", status: "completed", createdAt: "2026-04-12" },
  { id: "TXN-003", invoiceId: "INV-002", amount: 18408, type: "payment", status: "pending", createdAt: "2026-04-16" },
];

export const salesData: SalesData[] = [
  { month: "Oct", revenue: 45000, orders: 12, units: 85 },
  { month: "Nov", revenue: 52000, orders: 15, units: 102 },
  { month: "Dec", revenue: 38000, orders: 9, units: 67 },
  { month: "Jan", revenue: 61000, orders: 18, units: 130 },
  { month: "Feb", revenue: 55000, orders: 14, units: 110 },
  { month: "Mar", revenue: 72000, orders: 21, units: 155 },
];

export const notifications: Notification[] = [
  { id: "N001", type: "low_stock", message: "Control Panel CP-X1 is below threshold (8/10)", read: false, createdAt: "2026-04-16" },
  { id: "N002", type: "low_stock", message: "Hydraulic Pump HP-50 is below threshold (12/15)", read: false, createdAt: "2026-04-16" },
  { id: "N003", type: "new_order", message: "New order ORD-2024-003 from Heavy Industries Co", read: false, createdAt: "2026-04-01" },
  { id: "N004", type: "payment", message: "Payment received for INV-001 from TechParts India", read: true, createdAt: "2026-04-10" },
  { id: "N005", type: "low_stock", message: "Electronic Components Kit below threshold (15/20)", read: false, createdAt: "2026-04-15" },
];
