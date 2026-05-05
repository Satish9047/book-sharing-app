import { Plus } from "lucide-react";
import Link from "next/link";

const TopBar = ({
  children,
  isLoggedIn,
}: Readonly<{
  children: React.ReactNode;
  isLoggedIn: boolean;
}>) => {
  const uploadHref = isLoggedIn ? "/upload" : "/login?from=/upload";

  return (
    <div className="ml-70 flex-1 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-18 flex items-center justify-end px-10">
        <div className="flex items-center gap-6">
          <Link
            href={uploadHref}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus size={18} />
            Upload
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
};

export default TopBar;
