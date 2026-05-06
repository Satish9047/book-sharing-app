"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      username: form.username,
      contact: form.contact,
    });

    setLoading(false);

    if (error) {
      toast.error(`Register failed: ${error.message || "Unknown error"}`, {
        duration: 5000,
      });
      return;
    }
    console.log("return data", data);
    toast.success("Register successful!", { duration: 5000 });
    router.push("/login");
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

        <div className="flex justify-end">
          <Link href="/login" className="text-blue-500 hover:underline text-sm">
            Login Here
          </Link>
        </div>

        <div className="flex justify-center">
          <p>or</p>
        </div>

        {/* OAuth Buttons */}
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
