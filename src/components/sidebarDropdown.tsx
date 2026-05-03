"use client";
import { ChevronDown } from "lucide-react";
import { SidebarDropdownProps } from "@/interface/interface";

import { useState } from "react";

const SidebarDropdown = ({ icon, label, items }: SidebarDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3.5 px-4 py-3 rounded-xl font-semibold text-slate-500 hover:bg-slate-50 hover:text-primary transition-all duration-200 group"
      >
        <div className="flex items-center gap-3.5">
          <span className="text-slate-400 group-hover:text-primary transition-colors">
            {icon}
          </span>
          <span className="text-sm tracking-tight">{label}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="pl-12 space-y-1 overflow-hidden">
          {items.map((item, id) => (
            <a
              key={id}
              href={item.href}
              className="block py-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdown;
