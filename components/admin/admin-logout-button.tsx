"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 px-3 py-2 rounded text-red-500 hover:bg-red-500/10 font-mono text-xs transition-colors w-full text-left"
    >
      <LogOut className="w-3.5 h-3.5" />
      <span>{loading ? "KELUAR..." : "LOGOUT"}</span>
    </button>
  );
}
