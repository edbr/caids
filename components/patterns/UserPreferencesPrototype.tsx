"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, ShieldCheck } from "lucide-react";
import { SecondaryBtn } from "@/components/ds/button";
import { DSInput } from "@/components/ds/input";

const PERMISSION_OPTIONS = [
  { key: "clinical_dashboard", label: "Clinical Dashboard" },
  { key: "notes", label: "Notes" },
  { key: "monitoring", label: "Monitoring" },
  { key: "components_library", label: "Components Library" },
] as const;

type PermissionKey = (typeof PERMISSION_OPTIONS)[number]["key"];

type UserPayload = {
  email?: string;
  user_metadata?: {
    full_name?: string;
    permissions?: PermissionKey[];
  };
};

export function UserPreferencesPrototype() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [accessToken, setAccessToken] = React.useState("");
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [savingProfile, setSavingProfile] = React.useState(false);
  const [savingPassword, setSavingPassword] = React.useState(false);
  const [signingOut, setSigningOut] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [permissions, setPermissions] = React.useState<PermissionKey[]>(["clinical_dashboard", "notes"]);
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  React.useEffect(() => {
    setMounted(true);
    setAccessToken(localStorage.getItem("supabase_access_token") ?? "");
  }, []);

  React.useEffect(() => {
    const loadUser = async () => {
      if (!supabaseUrl || !anonKey || !accessToken) {
        setLoadingUser(false);
        return;
      }

      try {
        const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
          method: "GET",
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = (await response.json()) as UserPayload & { msg?: string };
        if (!response.ok) {
          setError(data?.msg || "Unable to load user profile.");
          setLoadingUser(false);
          return;
        }

        setEmail(data.email ?? "");
        setName(data.user_metadata?.full_name ?? "");
        const incoming = data.user_metadata?.permissions;
        if (incoming && incoming.length > 0) {
          setPermissions(incoming.filter((p): p is PermissionKey => PERMISSION_OPTIONS.some((o) => o.key === p)));
        }
      } catch {
        setError("Network error while loading user.");
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [supabaseUrl, anonKey, accessToken]);

  const togglePermission = (key: PermissionKey) => {
    setPermissions((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key]
    );
  };

  const saveProfile = async () => {
    setError(null);
    setStatus(null);
    if (!supabaseUrl || !anonKey || !accessToken) {
      setError("Missing auth session. Log in first.");
      return;
    }

    try {
      setSavingProfile(true);
      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          email,
          data: {
            full_name: name,
            permissions,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.msg || "Unable to update profile.");
        return;
      }
      setStatus("Profile updated.");
    } catch {
      setError("Network error while updating profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async () => {
    setError(null);
    setStatus(null);
    if (!supabaseUrl || !anonKey || !accessToken) {
      setError("Missing auth session. Log in first.");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSavingPassword(true);
      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: anonKey,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data?.msg || "Unable to update password.");
        return;
      }
      setNewPassword("");
      setConfirmPassword("");
      setStatus("Password updated.");
    } catch {
      setError("Network error while updating password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setStatus(null);
    try {
      setSigningOut(true);
      if (supabaseUrl && anonKey && accessToken) {
        await fetch(`${supabaseUrl.replace(/\/$/, "")}/auth/v1/logout`, {
          method: "POST",
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } finally {
      localStorage.removeItem("supabase_access_token");
      localStorage.removeItem("supabase_refresh_token");
      setAccessToken("");
      setSigningOut(false);
      router.push("/prototype-login");
    }
  };

  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-background p-5">
        <p className="text-sm text-muted-foreground">Loading preferences...</p>
      </div>
    );
  }

  if (!supabaseUrl || !anonKey) {
    return (
      <div className="rounded-xl border border-border bg-background p-5">
        <p className="text-sm text-numo-orange-700">
          Missing env: <span className="font-semibold">NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY</span>
        </p>
      </div>
    );
  }

  if (!accessToken) {
    return (
      <div className="rounded-xl border border-border bg-background p-5">
        <p className="text-sm text-muted-foreground">No active login session found.</p>
        <Link href="/prototype-login" className="mt-3 inline-flex text-sm text-numo-blue-700 underline">
          Go to Login Prototype
        </Link>
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-border bg-muted/25 p-5 md:p-8">
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm md:p-8">
        <div className="mb-6 flex flex-col-reverse items-start justify-between gap-3 md:flex-row md:items-center md:gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-numo-blue-900">User Preferences</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your profile, permissions, and account security settings.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-numo-teal-500/40 bg-numo-teal-100/40 px-3 py-1 text-xs text-numo-teal-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Account Settings
          </span>
        </div>
        <div className="mb-4 flex justify-end">
          <SecondaryBtn
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="px-3 py-1.5 text-xs disabled:opacity-60"
          >
            {signingOut ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Sign out
          </SecondaryBtn>
        </div>

        {loadingUser ? (
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading profile...
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-xl border border-border bg-background p-4">
              <h3 className="text-sm font-semibold text-numo-blue-900">Profile</h3>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-numo-blue-900">Name</span>
                <DSInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-numo-blue-900">Email</span>
                <DSInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                />
              </label>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-numo-blue-900">Permissions</p>
                <div className="space-y-1.5">
                  {PERMISSION_OPTIONS.map((option) => (
                    <label key={option.key} className="inline-flex w-full items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        checked={permissions.includes(option.key)}
                        onChange={() => togglePermission(option.key)}
                        className="h-4 w-4 rounded border-border"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={saveProfile}
                disabled={savingProfile}
                className="inline-flex items-center gap-2 rounded-md border border-numo-blue-300 bg-background px-4 py-2 text-sm font-medium text-numo-blue-800 transition hover:border-numo-blue-500 hover:bg-numo-blue-50 disabled:opacity-60"
              >
                {savingProfile ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save profile
              </button>
            </div>

            <div className="space-y-3 rounded-xl border border-border bg-background p-4">
              <h3 className="text-sm font-semibold text-numo-blue-900">Security</h3>
              <p className="text-xs text-muted-foreground">Update your password.</p>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-numo-blue-900">New password</span>
                <DSInput
                  type="password"
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                />
              </label>

              <label className="block space-y-1">
                <span className="text-xs font-medium text-numo-blue-900">Confirm new password</span>
                <DSInput
                  type="password"
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 focus-visible:ring-0 focus:border-numo-blue-500"
                />
              </label>

              <button
                type="button"
                onClick={updatePassword}
                disabled={savingPassword}
                className="inline-flex items-center gap-2 rounded-md border border-numo-blue-300 bg-background px-4 py-2 text-sm font-medium text-numo-blue-800 transition hover:border-numo-blue-500 hover:bg-numo-blue-50 disabled:opacity-60"
              >
                {savingPassword ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Update password
              </button>
            </div>
          </div>
        )}

        {error ? <p className="mt-4 text-xs text-numo-red-500">{error}</p> : null}
        {status ? <p className="mt-4 text-xs text-numo-teal-700">{status}</p> : null}
      </div>
    </section>
  );
}
