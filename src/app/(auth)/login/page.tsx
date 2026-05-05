"use client";

import { useState, Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { useTransition } from "react";

function SigninForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/profile";
  const [isPending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveAction("email");
    startTransition(async () => {
      const { data, error } = await authClient.signIn.email({
        email: form.email,
        password: form.password,
      });
      if (error) {
        toast.error(`Login failed!: ${error.message || "Unknown Error"}`, {
          duration: 5000,
        });
        return;
      }
      toast.success("Login successful!", { duration: 5000 });
      redirect("/profile");
    });
  };

  const handleOAuth = (provider: "google" | "github") => {
    setActiveAction(provider);
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: from,
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 border rounded"
      >
        <h2 className="text-2xl font-bold">Sign In</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white p-2"
        >
          {isPending && activeAction === "email" ? "Signing in..." : "Sign In"}
        </button>

        <div className="flex justify-between">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
          <Link
            href="/register"
            className="text-blue-500 hover:underline text-sm"
          >
            Register Here
          </Link>
        </div>
        <div className="flex justify-center">
          <p>or</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="flex justify-center items-center gap-2 border p-2"
          >
            <FaGoogle />
            {isPending && activeAction === "google"
              ? "Connecting Google..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="flex justify-center items-center gap-2 border p-2"
          >
            <FaGithub />
            {isPending && activeAction === "github"
              ? "Connecting GitHub..."
              : "Continue with GitHub"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SigninPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <SigninForm />
    </Suspense>
  );
}
