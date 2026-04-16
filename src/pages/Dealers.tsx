import { dealers } from "@/data/mockData";
import { Mail, Phone, MapPin } from "lucide-react";

const Dealers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dealer Management</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage dealer information and communications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {dealers.map((dealer) => (
          <div key={dealer.id} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold">{dealer.name}</h3>
                <p className="text-sm text-muted-foreground">{dealer.company}</p>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${dealer.status === "active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}>
                {dealer.status.toUpperCase()}
              </span>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" />{dealer.email}</div>
              <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" />{dealer.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" />{dealer.address}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dealers;
