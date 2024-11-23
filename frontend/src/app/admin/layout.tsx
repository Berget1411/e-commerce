import AdminGuard from "@/components/auth/admin-guard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </AdminGuard>
  );
}
