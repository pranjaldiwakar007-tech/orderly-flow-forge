import { salesData } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, AlertTriangle } from "lucide-react";

const Reports = () => {
  const avgRevenue = salesData.reduce((s, d) => s + d.revenue, 0) / salesData.length;
  const avgOrders = salesData.reduce((s, d) => s + d.orders, 0) / salesData.length;
  const forecast = {
    nextMonthRevenue: Math.round(avgRevenue * 1.08),
    nextMonthOrders: Math.round(avgOrders * 1.05),
    nextMonthUnits: Math.round(salesData.reduce((s, d) => s + d.units, 0) / salesData.length * 1.06),
  };

  const categoryData = [
    { name: "Motors", value: 35 },
    { name: "Pumps", value: 20 },
    { name: "Gears", value: 25 },
    { name: "Electronics", value: 10 },
    { name: "Belts", value: 10 },
  ];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Forecasting</h1>
        <p className="text-muted-foreground text-sm mt-1">Sales analytics and demand forecasting</p>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">Forecasted Revenue (Apr)</span>
          </div>
          <p className="text-2xl font-bold">₹{(forecast.nextMonthRevenue / 1000).toFixed(0)}K</p>
          <p className="text-xs text-success mt-1">Based on 6-month avg + 8% growth</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-muted-foreground">Forecasted Orders (Apr)</span>
          </div>
          <p className="text-2xl font-bold">{forecast.nextMonthOrders}</p>
          <p className="text-xs text-success mt-1">+5% expected growth</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <span className="text-xs font-medium text-muted-foreground">Units Needed (Apr)</span>
          </div>
          <p className="text-2xl font-bold">{forecast.nextMonthUnits}</p>
          <p className="text-xs text-warning mt-1">Plan production accordingly</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="stat-card">
          <h3 className="text-sm font-semibold mb-4">Revenue Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={260}>
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
          <h3 className="text-sm font-semibold mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sales Data Table */}
      <div className="stat-card overflow-hidden !p-0">
        <div className="px-5 py-3 border-b border-border bg-muted/30">
          <h3 className="text-sm font-semibold">Monthly Sales Report</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-5 py-3 font-medium text-muted-foreground">Month</th>
              <th className="text-right px-5 py-3 font-medium text-muted-foreground">Revenue (₹)</th>
              <th className="text-right px-5 py-3 font-medium text-muted-foreground">Orders</th>
              <th className="text-right px-5 py-3 font-medium text-muted-foreground">Units Sold</th>
              <th className="text-right px-5 py-3 font-medium text-muted-foreground">Avg Order Value</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((d) => (
              <tr key={d.month} className="border-b border-border/50 hover:bg-muted/20">
                <td className="px-5 py-3 font-medium">{d.month} 2026</td>
                <td className="px-5 py-3 text-right font-semibold">₹{d.revenue.toLocaleString()}</td>
                <td className="px-5 py-3 text-right">{d.orders}</td>
                <td className="px-5 py-3 text-right">{d.units}</td>
                <td className="px-5 py-3 text-right text-muted-foreground">₹{Math.round(d.revenue / d.orders).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
