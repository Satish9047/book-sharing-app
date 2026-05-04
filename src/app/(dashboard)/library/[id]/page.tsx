"use client";
import RECENT_DOCS from "@/database/testdata";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ShieldCheck,
  Download,
  BookmarkPlus,
  Share2,
  Flag,
  Maximize2,
} from "lucide-react";

const PdfDetailsPage = () => {
  const pdfId = useParams().id;
  const pdfData = RECENT_DOCS.find((data) => data.id === pdfId);
  if (!pdfData) return <div>PDF not found</div>;
  return (
    <div className="p-10 bg-surface/50">
      <div className="grid grid-cols-12 gap-12 max-w-7xl">
        {/* Left: Book Cover Section */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[3/4] border border-outline-variant">
              <Image
                src={pdfData.coverImage}
                alt={pdfData.title}
                width={300}
                height={400}
                priority
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <button className="w-full py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                  <Maximize2 size={20} />
                  Preview Sample
                </button>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center px-2">
              <div className="flex gap-6">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-outline-variant uppercase tracking-widest mt-1">
                    Rating
                  </span>
                </div>
                <div className="w-px h-10 bg-outline-variant/30" />
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-full border border-outline-variant/50 text-secondary hover:bg-white hover:text-primary hover:shadow-md transition-all active:scale-90">
                  <Share2 size={20} />
                </button>
                <button className="p-3 rounded-full border border-outline-variant/50 text-secondary hover:bg-white hover:text-red-500 hover:shadow-md transition-all active:scale-90">
                  <Flag size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-8 space-y-12">
          <section className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <span className="px-3.5 py-1.5 bg-primary/5 text-primary rounded-full text-[10px] uppercase font-black tracking-widest border border-primary/10">
                Academic Paper
              </span>
              <span className="px-3.5 py-1.5 bg-emerald-500/5 text-emerald-600 rounded-full text-[10px] uppercase font-black tracking-widest border border-emerald-500/10">
                Verified Source
              </span>
            </div>
            <h1 className="text-5xl font-black text-on-surface leading-[1.1] tracking-tight">
              {pdfData.title}
            </h1>
            <p className="text-lg text-on-surface-variant font-medium leading-relaxed max-w-2xl">
              {pdfData.description}
            </p>
          </section>

          <div className="flex flex-wrap gap-4">
            <button className="flex-1 md:flex-none px-10 py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-primary-container shadow-xl shadow-primary/20 transition-all active:scale-95 group">
              <Download
                size={22}
                className="group-hover:-translate-y-1 transition-transform"
              />
              Download PDF
            </button>
          </div>

          {/* Uploader */}
          <div className="p-8 bg-primary/5 rounded-3xl border border-primary/10 flex flex-col md:flex-row items-center gap-8 group">
            <div className="relative">
              {/* <Image
                src={pdfData.uploader.avatar}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg transition-transform group-hover:scale-105"
                alt={MOCK_PAPER.uploader.name}
              /> */}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-lg border-2 border-white shadow-sm">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <p className="text-[10px] text-primary font-black uppercase tracking-widest">
                Uploaded By
              </p>
              <h4 className="text-2xl font-black text-on-surface">
                Project Admin
              </h4>
              <p className="text-sm text-on-surface-variant font-medium">
                {/* {MOCK_PAPER.uploader.role} */}
              </p>
            </div>
            <button className="px-6 py-3 text-primary font-black text-xs border-2 border-primary/20 rounded-xl hover:bg-white transition-all active:scale-95 shadow-sm">
              View Profile
            </button>
          </div>

          {/* Abstract */}
          {/* <article className="space-y-8 py-4">
            <h3 className="text-3xl font-black text-on-surface tracking-tight">
              Abstract & Summary
            </h3>
            <div className="space-y-6 text-base text-on-surface-variant font-medium leading-[1.8]">
              <p>{MOCK_PAPER.abstract}</p>
              <div className="space-y-4">
                <p className="font-bold text-on-surface uppercase text-xs tracking-widest">
                  Key highlights include:
                </p>
                <ul className="space-y-4">
                  {MOCK_PAPER.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4 items-start group">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article> */}
        </div>
      </div>
    </div>
  );
};

export default PdfDetailsPage;
