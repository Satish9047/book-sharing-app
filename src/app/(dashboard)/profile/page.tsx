"use client";
import { DocumentCard } from "@/components/documentCard";
import Input from "@/components/input";
import Stat from "@/components/statsCard";
import RECENT_DOCS from "@/database/testdata";
import { UserProfile } from "@/interface/interface";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const ProfilePage = () => {
  const INITIAL_USER: UserProfile = {
    name: "Alex Researcher",
    email: "alex.res@example.com",
    role: "Normal User",
    contact: "9876543212",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNkQBRIBEdOTIO6bxTbxA2sOZF1lxcWPPCGZkDDHAOn9kzP92M-Is7cS10NXzPiEuIj4p4I_fGARMJIT__mxic1bAhsw4-Z89YKtQpGklkT6BOuRENk7hDzp1OimXn3XmGw4d442QjywRcKobb3jEH75IfDkkUDrfvlxjEVui5tV3ApEnkpg6215T1i_EBRuiqpQifIS_M-r2a7a86wE9Z_nEVgN_ckd9H-fY0tFvLS30vSN_d68_LD_36UGJ7kzrfUwPuXRWE0tE5",
    stats: {
      downloads: "4.2k",
      followers: "89",
      collections: "12",
    },
  };

  const [user, setUser] = useState(INITIAL_USER);

  return (
    <div className="p-8 max-w-8xl mx-auto space-y-10">
      {/* Profile Section */}
      <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row items-center md:items-end gap-8">
        <div className="relative group">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYJVVVv9yC8TVRnArBtBfh_CF67NeFgDitxl2t4dLsxeguIfq8rYe1RWjW4Eb1IFeR6uLrkG_iEPjW9XYAav1FZsPlQTgInLYURh7RvkhmTUCgSaDwHKwYTctoQ4F_bZkZE4CY7rnnf0SJ6gbfdSKvgccWXC7pSAG1TQh65fJmFAamsaPoccDxmqWGj-QysOT0nNUzCUZn4E9yHwpOihcw-IuzT0CHqp6d-uBJw2N74XcNtJaNAsUFudLnlQ_tDQanZ4eLPwE7fNrm"
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
            <div className="w-px h-10 bg-slate-100 hidden md:block self-center" />
            {/* <Stat value={user.stats?.followers} label="Followers" />
            <div className="w-px h-10 bg-slate-100 hidden md:block self-center" />
            <Stat value={user.stats?.collections} label="Collections" /> */}
          </div>
        </div>

        <div className="flex gap-3">
          {/* <button className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-indigo-200 active:scale-95">
            Edit Profile
          </button> */}
          {/* <button className="p-2.5 bg-slate-50 text-zinc-600 rounded-xl hover:bg-slate-100 border border-slate-100 transition-colors">
            <Share2 size={20} />
          </button> */}
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: PDFs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center gap-8 border-b border-slate-200">
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
              My Uploads
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {RECENT_DOCS.map((doc, index) => (
              <DocumentCard key={index} {...doc} />
            ))}
          </div>
        </div>

        {/* Right Column: Settings & Pro */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-zinc-900">Account Details</h4>
              <button className="text-primary text-xs font-bold hover:underline">
                Manage
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Display Name" value={user.name} />
              <Input label="Email Address" value={user.email} />
              <Input label="Contact Number" value={user.contact} />
            </div>

            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-md hover:shadow-lg transition-all active:scale-95">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
