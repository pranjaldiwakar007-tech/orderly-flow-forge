CREATE TABLE IF NOT EXISTS public.material_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  supplier_id UUID NOT NULL REFERENCES public.suppliers(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount NUMERIC NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.material_order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.material_orders(id) ON DELETE CASCADE,
  material_id UUID NOT NULL REFERENCES public.raw_materials(id) ON DELETE RESTRICT,
  quantity NUMERIC NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.material_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view material orders" ON public.material_orders FOR SELECT USING (true);
CREATE POLICY "Anyone can create material orders" ON public.material_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update material orders" ON public.material_orders FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete material orders" ON public.material_orders FOR DELETE USING (true);

CREATE POLICY "Anyone can view material order items" ON public.material_order_items FOR SELECT USING (true);
CREATE POLICY "Anyone can create material order items" ON public.material_order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update material order items" ON public.material_order_items FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete material order items" ON public.material_order_items FOR DELETE USING (true);

CREATE TRIGGER update_material_orders_updated_at
BEFORE UPDATE ON public.material_orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();