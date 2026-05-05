"use client";
import SidebarLink from "@/components/sidebarLink";
import { authClient } from "@/lib/auth-client";
import {
  Home,
  Library,
  User,
  ShieldCheck,
  Users,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Session = typeof authClient.$Infer.Session | null;

const SideLayout = ({
  children,
  userSession,
}: Readonly<{
  children: React.ReactNode;
  userSession: Session | null; // Replace 'any' with the actual type for the user session
}>) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = userSession?.user?.role === "admin";
  const isUser = !!userSession?.user.name;
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await authClient.signOut();
    });
    router.push("/login");
  };

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
          {isUser && (
            <SidebarLink
              icon={<User size={20} />}
              label="Profile"
              path="profile"
              active={pathname === "/profile"}
            />
          )}

          {isAdmin && (
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
          )}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 ">
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden ring-2 ring-white ring-offset-2 ">
              {/* image of the user */}
              {userSession?.user.image ? (
                <Image
                  src={userSession.user.image}
                  alt={userSession.user.name}
                  width={140}
                  height={140}
                  priority
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-300 text-slate-600">
                  <CgProfile />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                {userSession?.user ? (
                  <>
                    <span className="text-sm font-bold text-zinc-900">
                      {userSession.user.name}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      {userSession.user.email}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      {userSession.user.role}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-bold text-zinc-900">Guest</span>
                )}
              </div>
            </div>
          </div>
          {userSession?.user && (
            <div className="flex justify-center w-full">
              <button
                onClick={handleLogout}
                className="my-2 px-4 py-2 bg-red-500 text-white rounded w-full"
              >
                {isPending ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          )}
        </div>
      </aside>
      {children}
    </div>
  );
};

export default SideLayout;
