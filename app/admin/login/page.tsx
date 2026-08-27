"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Terminal, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("rehaansekap@gmail.com");
  const [password, setPassword] = useState("J#5syL0l1789");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw authError;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded border border-border-subtle bg-bg-elevated/40 shadow-sm">
        {/* Terminal Header */}
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-border-subtle font-mono">
          <div className="w-8 h-8 rounded bg-text-primary text-bg-base flex items-center justify-center font-bold text-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-text-primary">
              ADMIN LOGIN
            </h1>
            <p className="text-[11px] text-text-muted">
              Raihan Syeka Portfolio Management
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 font-mono text-xs">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-muted flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>EMAIL</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-text-muted flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>PASSWORD</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 font-mono text-xs bg-bg-base border border-border-subtle rounded focus:outline-none focus:border-border-hover text-text-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 flex items-center justify-center gap-2 p-3 rounded bg-accent text-bg-base font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity font-mono disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AUTHENTICATING...</span>
              </>
            ) : (
              <>
                <span>LOGIN KE PANEL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-subtle/60 text-center font-mono text-[11px] text-text-muted">
          Protected by Supabase Auth (Single User Access)
        </div>
      </div>
    </div>
  );
}
