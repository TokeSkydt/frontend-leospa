import "../../globals.css";
import AdminLayoutClient from "./clientlayout";

export const metadata = {
  title: "Admin Panel",
  description: "Admin dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AdminLayoutClient>{children}</AdminLayoutClient>
      </body>
    </html>
  );
}
