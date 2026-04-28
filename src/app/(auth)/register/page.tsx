"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email({
      email: form.email,
      password: form.password,
      name: form.name,
      // custom fields
      username: form.username,
      contact: form.contact,
    });

    setLoading(false);

    if (error) {
      alert(error.message || "Signup failed");
      return;
    }
    console.log("return data", data);

    alert("Signup successful");
    window.location.href = "/signin";
  };

  const handleOAuth = async (provider: "google" | "github") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/profile", // redirect here after successful OAuth
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 p-6 border rounded"
      >
        <h2 className="text-2xl font-bold">Sign Up</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2"
          required
        />

        <input
          name="contact"
          placeholder="Contact"
          onChange={handleChange}
          className="w-full border p-2"
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
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* OAuth Buttons */}
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            className="border p-2"
          >
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuth("github")}
            className="border p-2"
          >
            Continue with GitHub
          </button>
        </div>
      </form>
    </div>
  );
}
