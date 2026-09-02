import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col md:flex-row font-sans">
      {/* Sticky sidebar for authenticated user */}
      {user && <AdminSidebar userEmail={user.email} />}

      {/* Main Admin Content */}
      <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
