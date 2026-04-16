import { suppliers, quotations } from "@/data/mockData";
import { Star, Mail, Phone, MapPin } from "lucide-react";

const Suppliers = () => {
  const statusColor: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    accepted: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Supplier & Procurement</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage suppliers and compare quotations</p>
      </div>

      {/* Suppliers */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Suppliers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{s.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                    <span className="text-sm font-medium">{s.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.materials.map((m) => (
                    <span key={m} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{m}</span>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{s.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{s.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{s.address}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quotations */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quotations</h2>
        <div className="stat-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">ID</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Supplier</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Material</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Price (₹)</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Qty</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Delivery</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((q) => (
                  <tr key={q.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-5 py-3 font-mono text-xs">{q.id}</td>
                    <td className="px-5 py-3 font-medium">{q.supplierName}</td>
                    <td className="px-5 py-3 text-muted-foreground">{q.materialName}</td>
                    <td className="px-5 py-3 text-right font-semibold">₹{q.price.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right">{q.quantity}</td>
                    <td className="px-5 py-3 text-right">{q.deliveryDays} days</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[q.status]}`}>{q.status.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
