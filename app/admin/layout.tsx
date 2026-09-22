"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isDashboard = pathname === "/admin";
  const isLogin = pathname === "/admin/login";

  return (
    <div className="admin-shell min-h-screen bg-[#050816] text-white">
      {!isDashboard && !isLogin && (
        <div className="admin-topbar border-b border-white/10 bg-[#070b1b]/90 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/admin"
              className="admin-back-link inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              <span aria-hidden="true">←</span>
              Back to dashboard
            </Link>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
