import { useEffect, useState } from "react";
import { Plus, Trash2, Truck } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SupplierRow {
  id: string;
  name: string;
}
interface MaterialRow {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}
interface LineItem {
  materialId: string;
  quantity: number;
  unitPrice: number;
}

interface Props {
  onCreated?: () => void;
}

const PlaceMaterialOrderDialog = ({ onCreated }: Props) => {
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<SupplierRow[]>([]);
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [supplierId, setSupplierId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<LineItem[]>([
    { materialId: "", quantity: 1, unitPrice: 0 },
  ]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    (async () => {
      const [s, m] = await Promise.all([
        supabase.from("suppliers").select("id,name"),
        supabase.from("raw_materials").select("id,name,unit,quantity"),
      ]);
      setSuppliers(s.data ?? []);
      setMaterials(m.data ?? []);
    })();
  }, [open]);

  const total = items.reduce((sum, it) => sum + it.quantity * it.unitPrice, 0);

  const addLine = () =>
    setItems([...items, { materialId: "", quantity: 1, unitPrice: 0 }]);
  const removeLine = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateLine = (i: number, patch: Partial<LineItem>) =>
    setItems(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const reset = () => {
    setSupplierId("");
    setNotes("");
    setItems([{ materialId: "", quantity: 1, unitPrice: 0 }]);
  };

  const handleSubmit = async () => {
    if (!supplierId) return toast.error("Select a supplier");
    const valid = items.filter((it) => it.materialId && it.quantity > 0);
    if (valid.length === 0) return toast.error("Add at least one material");

    setSubmitting(true);
    try {
      const { data: order, error: orderErr } = await supabase
        .from("material_orders")
        .insert({
          supplier_id: supplierId,
          status: "pending",
          total_amount: total,
          notes: notes || null,
        })
        .select("id")
        .single();
      if (orderErr) throw orderErr;

      const payload = valid.map((it) => ({
        order_id: order.id,
        material_id: it.materialId,
        quantity: it.quantity,
        unit_price: it.unitPrice,
      }));
      const { error: itemsErr } = await supabase
        .from("material_order_items")
        .insert(payload);
      if (itemsErr) throw itemsErr;

      toast.success("Material order placed");
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
        <Button variant="secondary">
          <Truck className="w-4 h-4 mr-2" /> Place Material Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Raw Materials</DialogTitle>
          <DialogDescription>
            Place a purchase order for raw materials with a supplier.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Supplier</Label>
            <Select value={supplierId} onValueChange={setSupplierId}>
              <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
              <SelectContent>
                {suppliers.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Materials</Label>
              <Button size="sm" variant="outline" onClick={addLine}>
                <Plus className="w-3 h-3 mr-1" /> Add material
              </Button>
            </div>
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <Select
                    value={it.materialId}
                    onValueChange={(v) => updateLine(i, { materialId: v })}
                  >
                    <SelectTrigger><SelectValue placeholder="Material" /></SelectTrigger>
                    <SelectContent>
                      {materials.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} ({m.quantity} {m.unit})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min={1}
                    placeholder="Qty"
                    value={it.quantity}
                    onChange={(e) => updateLine(i, { quantity: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    placeholder="Unit price ₹"
                    value={it.unitPrice}
                    onChange={(e) => updateLine(i, { unitPrice: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="col-span-1 text-right text-sm font-medium">
                  ₹{(it.quantity * it.unitPrice).toLocaleString()}
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
            ))}
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Delivery instructions, urgency, etc."
              rows={2}
            />
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

export default PlaceMaterialOrderDialog;
