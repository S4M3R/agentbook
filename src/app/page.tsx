import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { supabaseKey, supabaseUrl } from "@/lib/supabase/env";

async function getSupabaseStatus() {
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: { apikey: supabaseKey },
      cache: "no-store",
    });
    return res.ok ? "connected" : `error (${res.status})`;
  } catch {
    return "unreachable";
  }
}

async function SupabaseStatus() {
  const supabase = await createClient();
  const [{ data }, status] = await Promise.all([
    supabase.auth.getClaims(),
    getSupabaseStatus(),
  ]);
  const email = data?.claims?.email;

  return (
    <>
      <dt>Supabase</dt>
      <dd className="font-mono text-black dark:text-zinc-50">{status}</dd>
      <dt>Session</dt>
      <dd className="font-mono text-black dark:text-zinc-50">
        {email ?? "signed out"}
      </dd>
    </>
  );
}

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-zinc-50 p-16 font-sans dark:bg-black">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        agentbook
      </h1>
      <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-2 text-zinc-600 dark:text-zinc-400">
        <Suspense
          fallback={
            <>
              <dt>Supabase</dt>
              <dd className="font-mono">checking…</dd>
            </>
          }
        >
          <SupabaseStatus />
        </Suspense>
      </dl>
    </main>
  );
}
