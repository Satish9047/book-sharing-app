"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (!token) {
      setMessage("Invalid reset token");
      return;
    }
    setLoading(true);
    setMessage("");

    const { data, error } = await authClient.resetPassword({
      newPassword: password,
      token,
    });
    console.log(data);
    setLoading(false);

    if (error) {
      setMessage(error.message || "Failed to reset password");
      return;
    }

    setMessage("Password reset successful. You can now log in.");
    setTimeout(() => {
      redirect("/login");
    }, 2000);
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-6 border rounded text-center">
          <h2 className="text-2xl font-bold">Invalid Reset Link</h2>
          <p>The reset link is invalid or expired.</p>
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Request a new reset link
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 border rounded"
      >
        <h2 className="text-2xl font-bold">Reset Password</h2>

        <input
          name="password"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
