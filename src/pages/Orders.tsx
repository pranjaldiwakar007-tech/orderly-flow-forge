import { orders } from "@/data/mockData";

const statusColor: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  quoted: "bg-info/10 text-info",
  approved: "bg-primary/10 text-primary",
  in_production: "bg-accent/10 text-accent",
  shipped: "bg-success/10 text-success",
  delivered: "bg-success/15 text-success",
  rejected: "bg-destructive/10 text-destructive",
};

const Orders = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Track and manage dealer orders</p>
      </div>

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
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3 font-mono text-xs">{order.id}</td>
                  <td className="px-5 py-3 font-medium">{order.dealerName}</td>
                  <td className="px-5 py-3 text-muted-foreground">
                    {order.items.map(i => `${i.productName} ×${i.quantity}`).join(", ")}
                  </td>
                  <td className="px-5 py-3 text-right font-semibold">₹{order.totalAmount.toLocaleString()}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || ""}`}>
                      {order.status.replace("_", " ").toUpperCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{order.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
