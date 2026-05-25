import { createFileRoute, Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/qsbs/Layout";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { linkPurchasesToCurrentUser } from "@/lib/payments.functions";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — 1202 Request" },
      { name: "robots", content: "noindex" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>) => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
    mode: s.mode === "signup" ? "signup" : "signin",
  }),
  component: LoginPage,
});

function LoginPage() {
  const { redirect, mode: initial } = useSearch({ from: "/login" });
  const nav = useNavigate();
  const { isAuthenticated, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(initial);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      linkPurchasesToCurrentUser().catch(() => {});
      nav({ to: (redirect as any) || "/dossiers" });
    }
  }, [loading, isAuthenticated, redirect, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/login` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e: any) {
      setError(e?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true); setError(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/login" });
      if (result.error) setError(result.error.message || "Google sign-in failed");
    } catch (e: any) {
      setError(e?.message || "Google sign-in failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageShell>
      <div className="mx-auto max-w-md px-5 py-16">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{mode === "signup" ? "Create account" : "Sign in"}</div>
        <h1 className="mt-2 text-3xl font-medium tracking-tight">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signup"
            ? "Your purchases and dossiers stay linked to this account."
            : "Sign in to access your purchased packets across devices."}
        </p>

        <button onClick={google} disabled={busy} className="qsbs-btn qsbs-btn-ghost w-full mt-6">
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" /> OR <div className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Password</label>
            <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
          {error && <div className="text-xs text-destructive">{error}</div>}
          <button type="submit" disabled={busy} className="qsbs-btn qsbs-btn-primary w-full">
            {busy ? "Working…" : mode === "signup" ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="mt-5 text-xs text-muted-foreground text-center">
          {mode === "signup" ? (
            <>Already have an account? <button className="qsbs-link" onClick={() => setMode("signin")}>Sign in</button></>
          ) : (
            <>New here? <button className="qsbs-link" onClick={() => setMode("signup")}>Create an account</button></>
          )}
        </div>

        <div className="mt-3 text-[11px] text-muted-foreground text-center">
          By continuing you agree to our <Link to="/terms" className="qsbs-link">Terms</Link> and <Link to="/privacy" className="qsbs-link">Privacy</Link>.
        </div>
      </div>
    </PageShell>
  );
}
