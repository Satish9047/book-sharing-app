"use client";
import { useRef, useState, useCallback } from "react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  ImageIcon,
  ChevronDown,
  Upload,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const UploadPage = () => {
  const inputPdfRef = useRef<HTMLInputElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isPdfDragging, setIsPdfDragging] = useState(false);
  const [isImageDragging, setIsImageDragging] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [abstract, setAbstract] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  // ── PDF handlers ─────────────────────────────────────────────
  const handlePdfFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const pdf = Array.from(incoming).find((f) => f.type === "application/pdf");
    if (!pdf) return;
    setPdfFile(pdf);
  }, []);

  const onPdfDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragging(true);
  };
  const onPdfDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node))
      setIsPdfDragging(false);
  };
  const onPdfDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPdfDragging(false);
    handlePdfFiles(e.dataTransfer.files);
  };
  const onPdfInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePdfFiles(e.target.files);
    e.target.value = "";
  };

  // ── Image handlers ───────────────────────────────────────────
  const handleImageFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const img = Array.from(incoming).find((f) => f.type.startsWith("image/"));
    if (!img) return;
    setImageFile(img);
    setImagePreview(URL.createObjectURL(img));
  }, []);

  const onImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsImageDragging(true);
  };
  const onImageDragLeave = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node))
      setIsImageDragging(false);
  };
  const onImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsImageDragging(false);
    handleImageFiles(e.dataTransfer.files);
  };
  const onImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageFiles(e.target.files);
    e.target.value = "";
  };

  const removeImage = () => {
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
  };

  // ── Submit ───────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!pdfFile) {
      setSubmitError("Please upload a PDF file.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      formData.append("pdf", pdfFile);
      if (imageFile) formData.append("image", imageFile);
      if (title) formData.append("title", title);
      if (author) formData.append("author", author);
      if (category) formData.append("category", category);
      if (abstract) formData.append("abstract", abstract);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Server error: ${res.status}`);
      }

      setSubmitSuccess(true);
    } catch (err: unknown) {
      setSubmitError((err as Error).message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-10 max-w-8xl mx-auto">
      <div className="space-y-8 pb-20">
        {/* ── PDF Upload Zone ── */}
        <div className="flex flex-col gap-4">
          <input
            ref={inputPdfRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={onPdfInputChange}
          />

          <section
            onClick={() => inputPdfRef.current?.click()}
            onDragOver={onPdfDragOver}
            onDragLeave={onPdfDragLeave}
            onDrop={onPdfDrop}
            className={`bg-white p-10 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer shadow-sm relative overflow-hidden group
              ${isPdfDragging ? "border-indigo-500 bg-indigo-50/60 scale-[1.01]" : "border-slate-200 hover:border-indigo-500/50"}`}
          >
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all
              ${isPdfDragging ? "bg-indigo-100 scale-110" : "bg-indigo-50 group-hover:scale-110"}`}
            >
              <UploadCloud
                className={`w-8 h-8 transition-colors ${isPdfDragging ? "text-indigo-700" : "text-indigo-600"}`}
              />
            </div>
            <h3 className="text-lg font-semibold text-zinc-900">
              {isPdfDragging ? "Drop to upload" : "Drag & drop research papers"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              PDF up to 50MB ·{" "}
              <span className="text-indigo-500 underline underline-offset-2">
                browse files
              </span>
            </p>
          </section>

          {pdfFile && (
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-800 truncate">
                    {pdfFile.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatSize(pdfFile.size)}
                  </p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPdfFile(null);
                  }}
                  className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </li>
            </ul>
          )}
        </div>

        {/* ── Metadata Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Cover Image Upload ── */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
                Cover Image
              </h4>

              <input
                ref={inputImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageInputChange}
              />

              <div
                onClick={() => !imageFile && inputImageRef.current?.click()}
                onDragOver={onImageDragOver}
                onDragLeave={onImageDragLeave}
                onDrop={onImageDrop}
                className={`aspect-3/4 rounded-xl border flex flex-col items-center justify-center relative overflow-hidden transition-all
                  ${imageFile ? "cursor-default border-slate-200 bg-slate-50" : "cursor-pointer group"}
                  ${isImageDragging ? "border-indigo-500 bg-indigo-50/60 scale-[1.01]" : "border-slate-200 hover:border-indigo-500/50"}`}
              >
                {imagePreview ? (
                  <>
                    {/* Preview */}
                    <Image
                      src={imagePreview}
                      alt="Cover preview"
                      width={400}
                      height={533}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Remove button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-red-50 transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                    {/* Replace overlay */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        inputImageRef.current?.click();
                      }}
                      className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100 cursor-pointer"
                    >
                      <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1.5 rounded-lg">
                        Replace
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-10 grayscale group-hover:opacity-20 transition-opacity" />
                    <div className="relative z-10 flex flex-col items-center text-center px-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3 transition-all
                        ${isImageDragging ? "text-indigo-600 scale-110" : "text-slate-400 group-hover:text-indigo-600 group-hover:scale-110"}`}
                      >
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <span
                        className={`text-sm font-semibold transition-colors
                        ${isImageDragging ? "text-indigo-600" : "text-slate-500 group-hover:text-indigo-600"}`}
                      >
                        {isImageDragging ? "Drop image here" : "Upload Cover"}
                      </span>
                      <span className="text-xs text-slate-400 mt-1">
                        or drag & drop
                      </span>
                    </div>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed font-medium">
                Optional: If not provided, a generic cover based on the title
                will be generated.
              </p>
            </div>
          </div>

          {/* ── Document Details Form ── */}
          <div className="lg:col-span-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Book Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-medium"
                    placeholder="e.g. Advanced Quantum Mechanics"
                    type="text"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Author Name
                  </label>
                  <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-medium"
                    placeholder="Full name or Institution"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none appearance-none text-slate-900 font-medium cursor-pointer"
                  >
                    <option value="">Select a category</option>
                    <option>Computer Science</option>
                    <option>Physics</option>
                    <option>Mathematics</option>
                    <option>Philosophy</option>
                    <option>Biology</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-5 h-5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Abstract / Description
                </label>
                <textarea
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-slate-900 font-medium resize-none min-h-30"
                  placeholder="Briefly describe the research content and key findings..."
                />
              </div>
            </div>

            {/* ── Error / Success feedback ── */}
            {submitError && (
              <p className="mt-4 text-sm text-red-500 font-medium px-1">
                {submitError}
              </p>
            )}
            {submitSuccess && (
              <p className="mt-4 text-sm text-emerald-600 font-medium px-1 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Document uploaded
                successfully!
              </p>
            )}

            {/* ── Actions ── */}
            <div className="flex items-center justify-end gap-4 py-8">
              <button
                onClick={() => {
                  setPdfFile(null);
                  removeImage();
                  setTitle("");
                  setAuthor("");
                  setCategory("");
                  setAbstract("");
                  setSubmitError(null);
                  setSubmitSuccess(false);
                }}
                className="px-8 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-10 py-3 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-60 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isSubmitting ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
