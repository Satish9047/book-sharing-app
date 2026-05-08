import { DocumentCard } from "@/components/documentCard";
import { db } from "@/database/db"; // Adjust this path to your actual db connection
import { uploadedDocuments, users } from "@/database/schema"; // Adjust this path to your schema
import { eq, desc } from "drizzle-orm";

const LibraryPage = async () => {
  // Fetch documents from Neon DB
  // We use desc() to show the newest uploads first
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
    .orderBy(desc(uploadedDocuments.createdAt));

  docs.forEach((doc) => {
    if (doc.uploaderAvatar == null) {
      return (doc.uploaderAvatar =
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
    }
  });

  console.log("library", docs);

  return (
    <div className="p-10 max-w-8xl mx-auto pb-24">
      <section>
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-5">
          <div>
            <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
              Library
            </h3>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
              Find the pdf you are looking for
            </p>
          </div>
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

export default LibraryPage;

// import { DocumentCard } from "@/components/documentCard";
// import RECENT_DOCS from "@/database/testdata";

// const LibraryPage = () => {
//   return (
//     <div className="p-10 max-w-8xl mx-auto pb-24">
//       {/* Documents Section */}
//       <section>
//         <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-5">
//           <div>
//             <h3 className="text-2xl font-bold text-zinc-900 tracking-tight">
//               Library
//             </h3>
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">
//               Find the pdf you are looking for
//             </p>
//           </div>
//           <button className="flex items-center gap-1 text-sm font-bold text-primary hover:gap-2 transition-all">
//             View all library
//             {/* <ChevronRight size={16} /> */}
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
//           {RECENT_DOCS.map((doc, index) => (
//             <DocumentCard key={index} {...doc} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LibraryPage;
