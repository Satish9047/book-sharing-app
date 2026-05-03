import { ChevronRight } from "lucide-react";

const Input = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-2">
        {label}
      </label>
      <div className="relative group">
        <input
          readOnly
          type="text"
          value={value}
          className="w-full px-4 py-3 bg-slate-50 border border-transparent focus:border-primary focus:ring-4 focus:ring-indigo-100/50 rounded-xl text-sm font-medium transition-all outline-none text-zinc-900"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all">
          <ChevronRight size={16} className="text-zinc-300" />
        </div>
      </div>
    </div>
  );
};

export default Input;
