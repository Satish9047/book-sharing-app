"use client";
import SidebarLink from "@/components/sidebarLink";
import {
  Home,
  Library,
  User,
  ShieldCheck,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";


const SideLayout =  ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="fixed left-0 top-0 h-full w-70 bg-white border-r border-slate-200 flex flex-col z-50">
        <div className="px-8 py-10">
          <h1 className="text-2xl font-black tracking-tighter text-zinc-900 leading-none">
            Paperless
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-widest mt-2 uppercase">
            PDF Books
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <SidebarLink
            icon={<Home size={20} />}
            label="Home"
            path="/"
            active={pathname === "/" || pathname === "/"}
          />
          <SidebarLink
            icon={<Library size={20} />}
            label="Library"
            path="library"
            active={pathname === "/library"}
          />
          <SidebarLink
            icon={<User size={20} />}
            label="Profile"
            path="profile"
            active={pathname === "/profile"}
          />
          <div className="flex-1 px-4 space-y-2">
            <div className="flex space-x-2 items-center text-slate-400 uppercase tracking-wider text-xs font-bold">
              <ShieldCheck />
              <p>Admin</p>
            </div>
            <div>
              <SidebarLink
                icon={<LayoutDashboard size={20} />}
                label="Admin-Dashboard"
                path="/admin-dashboard"
                active={pathname === "/admin-dashboard"}
              />
              <SidebarLink
                icon={<Users size={20} />}
                label="Users"
                path="/users"
                active={pathname === "/users"}
              />
            </div>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white ring-offset-2">
              {/* image of the user */}
              {/* <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIDc_hn9TK6ISMumDifM-TknIEihWGmyWU3_i-aKSC2Jt5ddbJCuu0x7JrAkJwaYVl-JvYy484-HqgrOta0WbitTB8TkkCEMJQLhoFvSi0rCNAptU1EG4VQVKoWWskCN8ujWh-SDpDFG839N-QdogKr-TJTwayPJQY5n2oIXRgRu_ZnRs6J-jN4AfxuYyTi1noidf4zUXVkQrTQ385N1YwEyIFtOFi02VhRVIifxckO3gVa-tb_UVUPFX_ez9y3qKIlFYiOveqw8Mc"
                alt="Alex Rivers"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              /> */}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-zinc-900">
                Alex Rivers
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Premium Scholar
              </span>
            </div>
          </div>
        </div>
      </aside>
      {children}
    </div>
  );
};

export default SideLayout;
