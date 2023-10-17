import MainNav from "@/components/navigation/main-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />

      {children}
    </div>
  );
}
