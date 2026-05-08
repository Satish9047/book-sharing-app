import { DocumentCard } from "@/components/documentCard";
import { eq, desc } from "drizzle-orm";
import { db } from "@/database/db";
import { uploadedDocuments, users } from "@/database/schema";
import Link from "next/link";

const HomePage = async () => {
  const docs = await db
    .select({
      // Select specific fields from document
      id: uploadedDocuments.id,
      title: uploadedDocuments.title,
      author: uploadedDocuments.author,
      imageUrl: uploadedDocuments.imageUrl,
      category: uploadedDocuments.category,
      // Select specific fields from user
      uploaderName: users.name,
      uploaderAvatar: users.image, // assuming these fields exist in your users table
    })
    .from(uploadedDocuments)
    .innerJoin(users, eq(uploadedDocuments.uploadedByUserId, users.id))
    .orderBy(desc(uploadedDocuments.createdAt))
    .limit(8);

  console.log(docs);
  return (
    <div className="p-10 max-w-8xl mx-auto pb-24">
      {/* Documents Section */}
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-5">
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Recent Documents
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Based on your recent activity
            </p>
          </div>
          <Link
            href="/library"
            className="flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all"
          >
            View all library
            {/* <ChevronRight size={16} /> */}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {docs.map((doc) => (
            <DocumentCard key={doc.id} {...doc} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
