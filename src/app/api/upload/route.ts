import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { UploadApiResponse } from "cloudinary";
import { db } from "@/database/db";
import { uploadedDocuments } from "@/database/schema";
import { cloudinary } from "@/lib/cloudinary";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// export const runtime = "nodejs";

const MAX_PDF_SIZE = 50 * 1024 * 1024;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

const metadataSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  author: z.string().trim().min(1, "Author is required").max(120),
  category: z.string().trim().min(1, "Category is required").max(100),
  abstract: z.string().trim().min(1, "Abstract is required").max(5000),
  uploadedByUserId: z.string().trim(),
});

type CloudinaryResourceType = "image" | "raw";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File && value.size > 0 ? value : null;
}

async function uploadFileToCloudinary(
  file: File,
  folder: string,
  resourceType: CloudinaryResourceType,
) {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        original_filename: file.name,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result) {
          reject(new Error("Cloudinary upload returned no result"));
          return;
        }

        resolve(result);
      },
    );

    stream.end(buffer);
  });
}

async function deleteCloudinaryAsset(
  publicId: string | undefined,
  resourceType: CloudinaryResourceType,
) {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error("[UPLOAD_CLOUDINARY_CLEANUP]", error);
  }
}

export async function POST(req: NextRequest) {
  let pdfUpload: UploadApiResponse | null = null;
  let imageUpload: UploadApiResponse | null = null;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = session.user?.id;

  try {
    const formData = await req.formData();
    const metadata = metadataSchema.safeParse({
      title: getString(formData, "title"),
      author: getString(formData, "author"),
      category: getString(formData, "category"),
      abstract: getString(formData, "abstract"),
      uploadedByUserId: userId,
    });

    if (!metadata.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: metadata.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const pdfFile = getFile(formData, "pdf");
    const imageFile = getFile(formData, "image");

    if (!pdfFile) {
      return NextResponse.json(
        { message: "PDF file is required" },
        { status: 400 },
      );
    }

    if (pdfFile.type !== "application/pdf") {
      return NextResponse.json(
        { message: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    if (pdfFile.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        { message: "PDF file too large. Max 50MB allowed." },
        { status: 400 },
      );
    }

    if (imageFile && !imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed for the preview image" },
        { status: 400 },
      );
    }

    if (imageFile && imageFile.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { message: "Image file too large. Max 10MB allowed." },
        { status: 400 },
      );
    }

    pdfUpload = await uploadFileToCloudinary(
      pdfFile,
      "book-sharing-app/pdfs",
      "raw",
    );

    if (imageFile) {
      imageUpload = await uploadFileToCloudinary(
        imageFile,
        "book-sharing-app/covers",
        "image",
      );
    }

    const [document] = await db
      .insert(uploadedDocuments)
      .values({
        title: metadata.data.title,
        author: metadata.data.author,
        uploadedByUserId: metadata.data.uploadedByUserId,
        category: metadata.data.category,
        abstract: metadata.data.abstract,
        imagePublicId: imageUpload?.public_id ?? null,
        pdfPublicId: pdfUpload.public_id,
        imageUrl: imageUpload?.secure_url ?? null,
        pdfUrl: pdfUpload.secure_url,
        fileName: pdfFile.name,
        fileSize: pdfFile.size,
        mimeType: pdfFile.type,
      })
      .returning();

    return NextResponse.json(
      { message: "Document uploaded", document },
      { status: 201 },
    );
  } catch (error) {
    await deleteCloudinaryAsset(imageUpload?.public_id, "image");
    await deleteCloudinaryAsset(pdfUpload?.public_id, "raw");

    console.error("[UPLOAD_POST]", error);

    return NextResponse.json(
      { message: "Unable to upload document" },
      { status: 500 },
    );
  }
}
