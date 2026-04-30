"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const { data, error } = await authClient.requestPasswordReset({
      email,
      redirectTo: "/reset-password",
    });
    console.log(data);

    setLoading(false);

    if (error) {
      setMessage(error.message || "Failed to send reset email");
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 border rounded"
      >
        <h2 className="text-2xl font-bold">Forgot Password</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>

        {message && <p className="text-sm text-center">{message}</p>}

        <div className="text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}
