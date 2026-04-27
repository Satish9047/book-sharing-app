CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"contact" text NOT NULL,
	"role" text NOT NULL,
	"password" text NOT NULL,
	"created_date" timestamp DEFAULT now() NOT NULL,
	"updated_date" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_contact_unique" UNIQUE("contact")
);
