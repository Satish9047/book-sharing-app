import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/db";
import { uploadedDocuments } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing document id" }, { status: 400 });
  }

  // Look up the document to get its Cloudinary URL and original filename
  const [doc] = await db
    .select({
      pdfUrl: uploadedDocuments.pdfUrl,
      fileName: uploadedDocuments.fileName,
      title: uploadedDocuments.title,
    })
    .from(uploadedDocuments)
    .where(eq(uploadedDocuments.id, id));

  if (!doc) {
    return NextResponse.json({ message: "Document not found" }, { status: 404 });
  }

  // Fetch the PDF from Cloudinary
  let pdfResponse: Response;
  try {
    pdfResponse = await fetch(doc.pdfUrl);
  } catch {
    return NextResponse.json(
      { message: "Failed to reach file storage" },
      { status: 502 },
    );
  }

  if (!pdfResponse.ok || !pdfResponse.body) {
    return NextResponse.json(
      { message: "Failed to fetch PDF from storage" },
      { status: 502 },
    );
  }

  // Sanitise the title so it is safe to use as a filename:
  // remove characters that are illegal in filenames on Windows/macOS/Linux
  const safeTitle = doc.title
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .trim()
    .substring(0, 100);

  const downloadName = `Paperless_${safeTitle}.pdf`;

  // Build response headers
  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  // attachment; filename forces the browser to save the file instead of opening it
  headers.set(
    "Content-Disposition",
    `attachment; filename="${downloadName}"; filename*=UTF-8''${encodeURIComponent(downloadName)}`,
  );
  headers.set("Cache-Control", "private, no-cache");

  // Forward Content-Length from Cloudinary if available so the browser can
  // show download progress
  const contentLength = pdfResponse.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  // Stream the body directly — no buffering the whole file in memory
  return new NextResponse(pdfResponse.body, { headers });
}
