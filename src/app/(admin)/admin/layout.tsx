// app/admin/layout.tsx
import "../../globals.css";
import AdminSidebar from "@/admincomponents/AdminSidebar";

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AdminSidebar />
        <main className="max-w-4xl m-auto absolute top-2 left-75">{children}</main>

      </body>
    </html>
  );
}
