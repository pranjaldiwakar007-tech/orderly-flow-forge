import { Package, ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Users, Truck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { products, rawMaterials, orders, invoices, salesData, notifications, dealers } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Dashboard = () => {
  const totalProducts = products.reduce((sum, p) => sum + p.quantity, 0);
  const lowStockItems = [...products.filter(p => p.quantity <= p.threshold), ...rawMaterials.filter(r => r.quantity <= r.threshold)];
  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "quoted").length;
  const totalRevenue = invoices.filter(i => i.status === "paid").reduce((sum, i) => sum + i.totalAmount, 0);
  const pendingPayments = invoices.filter(i => i.status === "pending" || i.status === "overdue").reduce((sum, i) => sum + i.totalAmount, 0);

  const stats = [
    { label: "Total Products", value: totalProducts, icon: Package, change: "+12%", up: true, color: "text-primary" },
    { label: "Active Orders", value: orders.filter(o => !["delivered", "rejected"].includes(o.status)).length, icon: ShoppingCart, change: "+8%", up: true, color: "text-accent" },
    { label: "Revenue (Paid)", value: `₹${(totalRevenue / 1000).toFixed(0)}K`, icon: DollarSign, change: "+15%", up: true, color: "text-success" },
    { label: "Low Stock Alerts", value: lowStockItems.length, icon: AlertTriangle, change: "-2", up: false, color: "text-warning" },
  ];

  const recentOrders = orders.slice(0, 4);
  const unreadNotifs = notifications.filter(n => !n.read);

  const statusColor: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    quoted: "bg-info/10 text-info",
    approved: "bg-primary/10 text-primary",
    in_production: "bg-accent/10 text-accent",
    shipped: "bg-success/10 text-success",
    delivered: "bg-success/15 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your manufacturing operations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <span className={`text-xs font-medium flex items-center gap-0.5 ${stat.up ? "text-success" : "text-warning"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Order Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
              <Line type="monotone" dataKey="orders" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ fill: "hsl(var(--accent))" }} />
              <Line type="monotone" dataKey="units" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <div className="stat-card lg:col-span-2">
          <h3 className="text-sm font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.dealerName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">₹{order.totalAmount.toLocaleString()}</span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusColor[order.status] || ""}`}>
                    {order.status.replace("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Alerts & Notifications</h3>
          <div className="space-y-3">
            {unreadNotifs.map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${n.type === "low_stock" ? "text-warning" : "text-info"}`} />
                <div>
                  <p className="text-xs leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{n.createdAt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
