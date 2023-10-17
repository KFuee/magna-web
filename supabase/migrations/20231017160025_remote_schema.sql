create table "public"."Products" (
    "id" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "code" text not null,
    "description" text not null
);


alter table "public"."Products" enable row level security;

CREATE UNIQUE INDEX "Products_pkey" ON public."Products" USING btree (id);

alter table "public"."Products" add constraint "Products_pkey" PRIMARY KEY using index "Products_pkey";

create policy "Enable insert for authenticated users only"
on "public"."Products"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users"
on "public"."Products"
as permissive
for select
to authenticated
using (true);



