import { invoices, transactions } from "@/data/mockData";
import { DollarSign, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const Billing = () => {
  const paid = invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.totalAmount, 0);
  const pending = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.totalAmount, 0);
  const overdue = invoices.filter(i => i.status === "overdue").reduce((s, i) => s + i.totalAmount, 0);

  const invStatusColor: Record<string, string> = {
    paid: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    overdue: "bg-destructive/10 text-destructive",
  };

  const txnStatusColor: Record<string, string> = {
    completed: "bg-success/10 text-success",
    pending: "bg-warning/10 text-warning",
    failed: "bg-destructive/10 text-destructive",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing & Finance</h1>
        <p className="text-muted-foreground text-sm mt-1">Invoices, payments, and transaction records</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-success" /></div>
          <div><p className="text-2xl font-bold">₹{(paid / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Paid</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center"><Clock className="w-5 h-5 text-warning" /></div>
          <div><p className="text-2xl font-bold">₹{(pending / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Pending</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-destructive" /></div>
          <div><p className="text-2xl font-bold">₹{(overdue / 1000).toFixed(1)}K</p><p className="text-xs text-muted-foreground">Overdue</p></div>
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Invoices</h2>
        <div className="stat-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Order</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Dealer</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Tax</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Total</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Due Date</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-5 py-3 font-mono text-xs">{inv.id}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{inv.orderId}</td>
                    <td className="px-5 py-3">{inv.dealerName}</td>
                    <td className="px-5 py-3 text-right">₹{inv.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">₹{inv.tax.toLocaleString()}</td>
                    <td className="px-5 py-3 text-right font-semibold">₹{inv.totalAmount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.dueDate}</td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${invStatusColor[inv.status]}`}>{inv.status.toUpperCase()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Transactions</h2>
        <div className="stat-card overflow-hidden !p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Transaction ID</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Invoice</th>
                  <th className="text-right px-5 py-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Type</th>
                  <th className="text-center px-5 py-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-left px-5 py-3 font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="px-5 py-3 font-mono text-xs">{txn.id}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{txn.invoiceId}</td>
                    <td className="px-5 py-3 text-right font-semibold">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-5 py-3 text-center"><span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{txn.type.toUpperCase()}</span></td>
                    <td className="px-5 py-3 text-center">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${txnStatusColor[txn.status]}`}>{txn.status.toUpperCase()}</span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{txn.createdAt}</td>
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

export default Billing;
