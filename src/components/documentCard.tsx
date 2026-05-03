import React from "react";
import { DocumentCardProps } from "@/interface/interface";
import Image from "next/image";
import Link from "next/link";
// import { motion } from "motion/react";

export const DocumentCard = ({
  id,
  title,
  category,
  coverImage,
  uploader,
}: DocumentCardProps) => {
  return (
    <div className="group flex flex-col gap-5">
      <div className="aspect-3/4 rounded-[24px] overflow-hidden bg-slate-100 shadow-sm border border-slate-200 relative">
        <Image
          src={coverImage}
          alt={title}
          width={450}
          height={600}
          priority
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" /> */}
      </div>

      <div className="flex flex-col gap-1.5 px-1">
        <Link href={`/library/${id}`}>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
            {category}
          </span>
          <h3 className="text-lg font-bold text-zinc-900 leading-tight group-hover:text-primary transition-colors cursor-pointer">
            {title}
          </h3>
          <div className="flex items-center gap-2.5 mt-2">
            <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
              <span className="text-[10px] font-bold text-indigo-700">
                {uploader.initials}
              </span>
            </div>
            <span className="text-xs font-medium text-slate-500">
              Uploaded by {uploader.name}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
