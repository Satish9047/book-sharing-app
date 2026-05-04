ALTER TABLE "uploaded_documents" ALTER COLUMN "id" SET DATA TYPE uuid USING CASE WHEN "id" ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN "id"::uuid ELSE gen_random_uuid() END;--> statement-breakpoint
ALTER TABLE "uploaded_documents" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "uploaded_documents" ALTER COLUMN "file_size" SET DATA TYPE integer USING "file_size"::integer;
