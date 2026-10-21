import type { ReactNode } from "react";

export const metadata = {
  title: "Admin CMS | Lala Jagannath",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#f8f5ef] text-[#302044]">{children}</div>;
}
