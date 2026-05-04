"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {FaGithub, FaGoogle} from "react-icons/fa";

export default function SigninPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signIn.email({
      email: form.email,
      password: form.password,
    });

    setLoading(false);
    console.log("return data", data);

    if (error) {
      alert(error.message || "Login failed");
      return;
    }

    alert("Login successful");
    window.location.href = "/profile"; // change if needed
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/profile",
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
          disabled={loading}
          className="w-full bg-black text-white p-2"
        >
          {loading ? "Signing in..." : "Sign In"}
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
        <div className="flex justify-center"><p>or</p></div>

        <div className="flex flex-col gap-2">
          <button
              type="button"
              onClick={() => handleOAuth("google")}
              className=" flex justify-center items-center gap-2 border p-2"
          >
            <FaGoogle />
            Continue with Google
          </button>

          <button
              type="button"
              onClick={() => handleOAuth("github")}
              className=" flex justify-center items-center gap-2 border p-2"
          >
            <FaGithub />
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
