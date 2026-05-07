"use client";

import { DocumentCard } from "@/components/documentCard";
import Input from "@/components/input";
import Stat from "@/components/statsCard";
import RECENT_DOCS from "@/database/testdata";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

type Session = {
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null;
    username?: string | null;
    contact?: string | null;
    role?: string | null;
  };

  session: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
} | null;

interface Props {
  session: Session;
}

const ProfileClient = ({ session }: Props) => {
  const user = {
    name: session?.user?.name || "Unknown User",
    email: session?.user?.email || "No Email",
    role: session?.user?.role || "Normal User",
    contact: session?.user?.contact || "Not Added",
    avatar:
      session?.user?.image ||
      "https://ui-avatars.com/api/?name=User&format=png",

    stats: {
      downloads: "4.2k",
    },
  };

  return (
    <div className="p-8 max-w-8xl mx-auto space-y-10">
      {/* Profile Section */}
      <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center md:items-end gap-8">
        <div className="relative group">
          <Image
            src={user.avatar}
            className="w-32 h-32 rounded-3xl object-cover shadow-lg border-4 border-white"
            alt="Avatar"
            width={128}
            height={128}
            priority
          />

          <div className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-md ring-4 ring-white">
            <CheckCircle2
              size={20}
              fill="currentColor"
              className="text-white"
            />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-zinc-900">{user.name}</h2>

            <span className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100 uppercase tracking-wider">
              {user.role}
            </span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-8">
            <Stat value={user.stats.downloads} label="Downloads" />
          </div>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
            My Uploads
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {RECENT_DOCS.map((doc, index) => (
              <DocumentCard key={index} {...doc} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h4 className="font-bold text-zinc-900">Account Details</h4>

            <div className="space-y-4">
              <Input label="Display Name" value={user.name} />
              <Input label="Email Address" value={user.email} />
              <Input label="Contact Number" value={user.contact} />
            </div>

            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileClient;
