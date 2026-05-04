import { SidebarLinkProps } from "@/interface/interface";
import Link from "next/link";

const SidebarLink = (props: SidebarLinkProps) => {
  const { icon, label, path, active } = props;
  return (
    <>
      <Link
        href={path}
        className={`
        flex items-center gap-3.5 px-4 py-3 rounded-xl font-semibold transition-all duration-200 group
        ${
          active
            ? "bg-slate-100 text-primary border-l-4 border-primary rounded-l-none"
            : "text-slate-500 hover:bg-slate-50 hover:text-primary"
        }
      `}
      >
        <span
          className={`${active ? "text-primary" : "text-slate-400 group-hover:text-primary transition-colors"}`}
        >
          {icon}
        </span>
        <span className="text-sm tracking-tight">{label}</span>
      </Link>
    </>
  );
};

export default SidebarLink;
