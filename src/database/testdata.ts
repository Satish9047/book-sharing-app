import { DocumentCardProps } from "@/interface/interface";

const RECENT_DOCS: DocumentCardProps[] = [
  {
    id: "1",
    title: "Neural Networks Vol. IV",
    category: "Artificial Intelligence",
    description:
      "An in-depth exploration of advanced neural network architectures and their applications in various domains.",
    coverImage:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    uploader: { name: "Julian Smith", initials: "JS" },
  },
  {
    id: "2",
    title: "Constitutional Frameworks",
    category: "Legal Studies",
    description:
      "An analysis of constitutional frameworks across different countries and their impact on governance and civil liberties.",
    coverImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=400&auto=format&fit=crop",
    uploader: { name: "Alex Rivers", initials: "AR" },
  },
  {
    id: "3",
    title: "Advanced Data Visualization",
    category: "Data Science",
    description:
      "A comprehensive guide to modern data visualization techniques and tools.",
    coverImage:
      "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    uploader: { name: "Maria Diaz", initials: "MD" },
  },
  {
    id: "4",
    title: "Stem Cell Innovations 2024",
    category: "Biomedicine",
    description:
      "An in-depth analysis of the latest advancements in stem cell research and their potential applications in regenerative medicine.",
    coverImage:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    uploader: { name: "Robert Kim", initials: "RK" },
  },
];

export default RECENT_DOCS;
