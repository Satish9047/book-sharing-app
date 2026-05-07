import { db } from "@/database/db";
import { uploadedDocuments, users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShieldCheck, Download, Share2, Flag, Maximize2 } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

const PdfDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  // Fetch document details and join with the user table
  const [pdfData] = await db
    .select({
      // Document fields
      title: uploadedDocuments.title,
      author: uploadedDocuments.author,
      abstract: uploadedDocuments.abstract,
      imageUrl: uploadedDocuments.imageUrl,
      pdfUrl: uploadedDocuments.pdfUrl,
      category: uploadedDocuments.category,
      // User fields
      uploaderName: users.name,
      uploaderAvatar: users.image,
      uploaderRole: users.role,
    })
    .from(uploadedDocuments)
    .where(eq(uploadedDocuments.id, id))
    .leftJoin(users, eq(uploadedDocuments.uploadedByUserId, users.id));
  console.log("document detail", pdfData);

  // If no document is found, trigger Next.js 404 page
  if (!pdfData) return notFound();

  return (
    <div className="p-10 bg-surface/50">
      <div className="grid grid-cols-12 gap-12 max-w-7xl mx-auto">
        {/* Left: Book Cover Section */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl bg-white aspect-3/4 border border-slate-200">
              <Image
                src={pdfData.imageUrl || "/placeholder-book.png"}
                alt={pdfData.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <a
                  href={pdfData.pdfUrl}
                  target="_blank"
                  className="w-full py-4 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all text-center"
                >
                  <Maximize2 size={20} />
                  Preview Sample
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-center px-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Category
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {pdfData.category}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-white hover:text-blue-500 transition-all">
                  <Share2 size={20} />
                </button>
                <button className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-white hover:text-red-500 transition-all">
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
              <span className="px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[10px] uppercase font-black tracking-widest border border-blue-100">
                {pdfData.category}
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
              {pdfData.title}
            </h1>
            <p className="text-xl text-slate-500 font-medium italic">
              By {pdfData.author}
            </p>
          </section>

          {/* Abstract */}
          <article className="space-y-8 py-4 border-t border-slate-100">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
              Abstract & Summary
            </h3>
            <div className="text-base text-slate-600 font-medium leading-[1.8] whitespace-pre-wrap">
              {pdfData.abstract}
            </div>
          </article>

          <div className="flex flex-wrap gap-4">
            <a
              href={`/api/download?id=${id}`}
              className="flex-1 md:flex-none px-10 py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95 group"
            >
              <Download
                size={22}
                className="group-hover:-translate-y-1 transition-transform"
              />
              Download PDF
            </a>
          </div>

          {/* Uploader Info */}
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 group">
            <div className="relative">
              {pdfData.uploaderAvatar ? (
                <Image
                  src={pdfData.uploaderAvatar}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                  alt={pdfData.uploaderName || "Uploader"}
                />
              ) : (
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-2xl">
                  {pdfData.uploaderName?.[0]}
                </div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-lg border-2 border-white shadow-sm">
                <ShieldCheck size={14} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left space-y-1">
              <p className="text-[10px] text-blue-600 font-black uppercase tracking-widest">
                Uploaded By
              </p>
              <h4 className="text-2xl font-black text-slate-900">
                {pdfData.uploaderName}
              </h4>
              <p className="text-sm text-slate-500 font-medium capitalize">
                {pdfData.uploaderRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfDetailsPage;
