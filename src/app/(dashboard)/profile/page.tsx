import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./profile.client";
import { db } from "@/database/db";
import { uploadedDocuments, users } from "@/database/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  if (!userId) {
    redirect("/login");
  }
  const docsUploadedByUser = await db
    .select({
      id: uploadedDocuments.id,
      title: uploadedDocuments.title,
      author: uploadedDocuments.author,
      imageUrl: uploadedDocuments.imageUrl,
      category: uploadedDocuments.category,
      uploaderName: users.name,
      uploaderAvatar: users.image,
    })
    .from(uploadedDocuments)
    .innerJoin(users, eq(uploadedDocuments.uploadedByUserId, users.id))
    .where(eq(uploadedDocuments.uploadedByUserId, userId))
    .orderBy(desc(uploadedDocuments.createdAt));

  return <ProfileClient session={session} documents={docsUploadedByUser} />;
};

export default ProfilePage;
