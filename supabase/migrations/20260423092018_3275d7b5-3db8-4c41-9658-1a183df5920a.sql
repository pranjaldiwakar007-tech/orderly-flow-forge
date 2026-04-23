
-- Open access to public role for demo (no auth required)
DROP POLICY IF EXISTS "Authenticated users can manage dealers" ON public.dealers;
CREATE POLICY "Public can manage dealers" ON public.dealers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage products" ON public.products;
CREATE POLICY "Public can manage products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage suppliers" ON public.suppliers;
CREATE POLICY "Public can manage suppliers" ON public.suppliers FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage raw_materials" ON public.raw_materials;
CREATE POLICY "Public can manage raw_materials" ON public.raw_materials FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage orders" ON public.orders;
CREATE POLICY "Public can manage orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage order_items" ON public.order_items;
CREATE POLICY "Public can manage order_items" ON public.order_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage invoices" ON public.invoices;
CREATE POLICY "Public can manage invoices" ON public.invoices FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage transactions" ON public.transactions;
CREATE POLICY "Public can manage transactions" ON public.transactions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage notifications" ON public.notifications;
CREATE POLICY "Public can manage notifications" ON public.notifications FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can manage quotations" ON public.quotations;
CREATE POLICY "Public can manage quotations" ON public.quotations FOR ALL USING (true) WITH CHECK (true);
