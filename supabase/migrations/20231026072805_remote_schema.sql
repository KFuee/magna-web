create type "public"."app_role" as enum ('administrator', 'operator');

drop policy "Acceso al CRUD completo para todos los usuarios autenticados" on "public"."Locations";

drop policy "Acceso al CRUD completo para todos los usuarios autenticados" on "public"."Products";

alter table "public"."InventoryItems" add column "created_by" uuid not null;

alter table "public"."InventoryItems" add constraint "InventoryItems_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."InventoryItems" validate constraint "InventoryItems_created_by_fkey";

create policy "CRUD completo para usuarios autenticados (administrators)"
on "public"."Inventories"
as permissive
for all
to authenticated
using ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'administrator'::text));


create policy "Acceso a CRUD completo para autenticados (administrators)"
on "public"."InventoryItems"
as permissive
for all
to authenticated
using ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'administrator'::text));


create policy "Acceso a CRUD completo para autenticados (administrators)"
on "public"."Locations"
as permissive
for all
to authenticated
using ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'administrator'::text));


create policy "Acceso a CRUD completo para autenticados (administrators)"
on "public"."Products"
as permissive
for all
to authenticated
using ((((auth.jwt() -> 'user_metadata'::text) ->> 'role'::text) = 'administrator'::text));



