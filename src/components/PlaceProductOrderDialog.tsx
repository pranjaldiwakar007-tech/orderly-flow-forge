import { useEffect, useState } from "react";
import { Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DealerRow {
  id: string;
  name: string;
  company: string | null;
}
interface ProductRow {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}
interface LineItem {
  productId: string;
  quantity: number;
}

interface Props {
  onCreated?: () => void;
}

const PlaceProductOrderDialog = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [dealers, setDealers] = useState<DealerRow[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [dealerId, setDealerId] = useState<string>("");
  const [items, setItems] = useState<LineItem[]>([{ productId: "", quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const [d, p] = await Promise.all([
        supabase.from("dealers").select("id,name,company").eq("status", "active"),
        supabase.from("products").select("id,name,price,unit,quantity"),
      ]);
      setDealers(d.data ?? []);
      setProducts(p.data ?? []);
    })();
  }, [open]);

  const total = items.reduce((sum, it) => {
    const p = products.find((pr) => pr.id === it.productId);
    return sum + (p ? p.price * it.quantity : 0);
  }, 0);

  const addLine = () => setItems([...items, { productId: "", quantity: 1 }]);
  const removeLine = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateLine = (i: number, patch: Partial<LineItem>) =>
    setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setDealerId("");
    setItems([{ productId: "", quantity: 1 }]);
  };

  const handleSubmit = async () => {
    if (!dealerId) return toast.error("Select a dealer");
    const valid = items.filter((it) => it.productId && it.quantity > 0);
    if (valid.length === 0) return toast.error("Add at least one product");

    setSubmitting(true);
    try {
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({ dealer_id: dealerId, status: "pending", total_amount: total })
        .select("id")
        .single();
      if (orderErr) throw orderErr;

      const itemsPayload = valid.map((it) => {
        const p = products.find((pr) => pr.id === it.productId)!;
        return {
          order_id: order.id,
          product_id: it.productId,
          quantity: it.quantity,
          unit_price: p.price,
        };
      });
      const { error: itemsErr } = await supabase.from("order_items").insert(itemsPayload);
      if (itemsErr) throw itemsErr;

      toast.success("Order placed successfully");
      reset();
      setOpen(false);
      onCreated?.();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <ShoppingCart className="w-4 h-4 mr-2" /> Place Product Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Place Product Order</DialogTitle>
          <DialogDescription>Create an order on behalf of a dealer.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Dealer</Label>
            <Select value={dealerId} onValueChange={setDealerId}>
              <SelectTrigger><SelectValue placeholder="Select dealer" /></SelectTrigger>
              <SelectContent>
                {dealers.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.company ?? d.name} — {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Items</Label>
              <Button size="sm" variant="outline" onClick={addLine}>
                <Plus className="w-3 h-3 mr-1" /> Add item
              </Button>
            </div>
            {items.map((it, i) => {
              const p = products.find((pr) => pr.id === it.productId);
              return (
                <div key={i} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-7">
                    <Select
                      value={it.productId}
                      onValueChange={(v) => updateLine(i, { productId: v })}
                    >
                      <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                      <SelectContent>
                        {products.map((pr) => (
                          <SelectItem key={pr.id} value={pr.id}>
                            {pr.name} — ₹{pr.price} ({pr.quantity} {pr.unit} in stock)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateLine(i, { quantity: Number(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-span-1 text-right text-sm font-medium">
                    {p ? `₹${(p.price * it.quantity).toLocaleString()}` : "—"}
                  </div>
                  <div className="col-span-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeLine(i)}
                      disabled={items.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-lg font-bold">₹{total.toLocaleString()}</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Placing..." : "Place Order"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlaceProductOrderDialog;
