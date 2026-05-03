import { Search, Bell, Settings, Plus } from "lucide-react";

const TopBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="ml-70 flex-1 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 h-18 flex items-center justify-end px-10">
        {/* <div className="flex-1 max-w-xl">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search research, authors, or tags..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 rounded-xl text-sm transition-all"
            />
          </div>
        </div> */}

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-500">
            <button className="p-2.5 hover:bg-slate-100 hover:text-primary transition-all rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2.5 hover:bg-slate-100 hover:text-primary transition-all rounded-xl">
              <Settings size={20} />
            </button>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95">
            <Plus size={18} />
            Upload
          </button>
        </div>
      </header>
      {children}
    </div>
  );
};

export default TopBar;
