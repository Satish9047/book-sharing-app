CREATE TABLE "uploaded_documents" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"category" text NOT NULL,
	"abstract" text NOT NULL,
	"image_public_id" text,
	"pdf_public_id" text NOT NULL,
	"pdf_url" text NOT NULL,
	"image_url" text,
	"file_name" text NOT NULL,
	"file_size" text NOT NULL,
	"mime_type" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
