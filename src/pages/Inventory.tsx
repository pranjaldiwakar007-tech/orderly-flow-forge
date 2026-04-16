import { useState } from "react";
import { Package, AlertTriangle, Search } from "lucide-react";
import { products, rawMaterials } from "@/data/mockData";

const Inventory = () => {
  const [tab, setTab] = useState<"products" | "materials">("products");
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  const filteredMaterials = rawMaterials.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  const stockStatus = (qty: number, threshold: number) => {
    if (qty <= threshold * 0.5) return { label: "Critical", className: "bg-destructive/10 text-destructive" };
    if (qty <= threshold) return { label: "Low", className: "bg-warning/10 text-warning" };
    return { label: "In Stock", className: "bg-success/10 text-success" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Track products and raw materials stock levels</p>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex bg-muted rounded-lg p-0.5">
          <button onClick={() => setTab("products")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "products" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
            Products ({products.length})
          </button>
          <button onClick={() => setTab("materials")} className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${tab === "materials" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}>
            Raw Materials ({rawMaterials.length})
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-sm border border-input rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Products Table */}
      {tab === "products" && (
        <div className="stat-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Product Name</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Category</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Threshold</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Price (₹)</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const status = stockStatus(p.quantity, p.threshold);
                  return (
                    <tr key={p.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{p.id}</td>
                      <td className="px-5 py-3 font-medium">{p.name}</td>
                      <td className="px-5 py-3 text-muted-foreground">{p.category}</td>
                      <td className="px-5 py-3 text-right font-semibold">{p.quantity} {p.unit}</td>
                      <td className="px-5 py-3 text-right text-muted-foreground">{p.threshold}</td>
                      <td className="px-5 py-3 text-right">₹{p.price.toLocaleString()}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.className}`}>{status.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Raw Materials Table */}
      {tab === "materials" && (
        <div className="stat-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Material Name</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Quantity</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Threshold</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMaterials.map((m) => {
                  const status = stockStatus(m.quantity, m.threshold);
                  return (
                    <tr key={m.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{m.id}</td>
                      <td className="px-5 py-3 font-medium">{m.name}</td>
                      <td className="px-5 py-3 text-right font-semibold">{m.quantity} {m.unit}</td>
                      <td className="px-5 py-3 text-right text-muted-foreground">{m.threshold}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${status.className}`}>{status.label}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
