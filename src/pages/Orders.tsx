import { useEffect, useState } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlaceProductOrderDialog from "@/components/PlaceProductOrderDialog";
import PlaceMaterialOrderDialog from "@/components/PlaceMaterialOrderDialog";

const statusColor: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  quoted: "bg-info/10 text-info",
  approved: "bg-primary/10 text-primary",
  in_production: "bg-accent/10 text-accent",
  shipped: "bg-success/10 text-success",
  delivered: "bg-success/15 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

interface ProductOrder {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  dealers: { name: string; company: string | null } | null;
  order_items: { quantity: number; products: { name: string } | null }[];
}

interface MaterialOrder {
  id: string;
  status: string;
  total_amount: number;
  created_at: string;
  notes: string | null;
  suppliers: { name: string } | null;
  material_order_items: { quantity: number; raw_materials: { name: string; unit: string } | null }[];
}

const Orders = () => {
  const [productOrders, setProductOrders] = useState<ProductOrder[]>([]);
  const [materialOrders, setMaterialOrders] = useState<MaterialOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [po, mo] = await Promise.all([
      supabase
        .from("orders")
        .select("id,status,total_amount,created_at,dealers(name,company),order_items(quantity,products(name))")
        .order("created_at", { ascending: false }),
      supabase
        .from("material_orders")
        .select("id,status,total_amount,created_at,notes,suppliers(name),material_order_items(quantity,raw_materials(name,unit))")
        .order("created_at", { ascending: false }),
    ]);
    setProductOrders((po.data as any) ?? []);
    setMaterialOrders((mo.data as any) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Place and track product orders (dealers) and raw material orders (suppliers)
          </p>
        </div>
        <div className="flex gap-2">
          <PlaceMaterialOrderDialog onCreated={load} />
          <PlaceProductOrderDialog onCreated={load} />
        </div>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Product Orders ({productOrders.length})</TabsTrigger>
          <TabsTrigger value="materials">Material Orders ({materialOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-4">
          <div className="stat-card overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Dealer</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Items</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground">Amount (₹)</th>
                    <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">Loading...</td></tr>
                  )}
                  {!loading && productOrders.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">No product orders yet. Click "Place Product Order".</td></tr>
                  )}
                  {productOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs">{order.id.slice(0, 8)}</td>
                      <td className="px-5 py-3 font-medium">{order.dealers?.company ?? order.dealers?.name ?? "—"}</td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {order.order_items.map((i) => `${i.products?.name ?? "?"} ×${i.quantity}`).join(", ")}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold">₹{Number(order.total_amount).toLocaleString()}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || ""}`}>
                          {order.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{format(new Date(order.created_at), "yyyy-MM-dd")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-4">
          <div className="stat-card overflow-hidden !p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Supplier</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Materials</th>
                    <th className="text-right px-5 py-3 font-medium text-muted-foreground">Amount (₹)</th>
                    <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">Loading...</td></tr>
                  )}
                  {!loading && materialOrders.length === 0 && (
                    <tr><td colSpan={6} className="px-5 py-8 text-center text-muted-foreground">No material orders yet. Click "Place Material Order".</td></tr>
                  )}
                  {materialOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs">{order.id.slice(0, 8)}</td>
                      <td className="px-5 py-3 font-medium">{order.suppliers?.name ?? "—"}</td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {order.material_order_items
                          .map((i) => `${i.raw_materials?.name ?? "?"} ×${i.quantity}${i.raw_materials?.unit ? ` ${i.raw_materials.unit}` : ""}`)
                          .join(", ")}
                      </td>
                      <td className="px-5 py-3 text-right font-semibold">₹{Number(order.total_amount).toLocaleString()}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || ""}`}>
                          {order.status.replace("_", " ").toUpperCase()}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{format(new Date(order.created_at), "yyyy-MM-dd")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Orders;
