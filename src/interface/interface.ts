export interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  path: string;
}

export interface SidebarDropdownProps extends SidebarLinkProps {
  items: { label: string; href: string }[];
}

export interface DocumentCardProps {
  abstract?: string;
  author: string;
  category: string;
  createdAt?: Date;
  fileName?: string;
  fileSize?: number;
  id: string;
  imagePublicId?: string;
  imageUrl: string | null;
  mimeType?: string;
  pdfPublicId?: string;
  pdfUrl?: string;
  title: string;
  uploadedByUserId?: string;
  uploaderName?: string;
  uploaderAvatar?: string | null;
  // id: string;
  // title: string;
  // category: string;
  // description: string;
  // coverImage: string;
  // uploader: {
  //   name: string;
  //   initials: string;
  // };
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
  contact: string;
  stats: UserStats;
}

export interface UserStats {
  downloads: string;
  followers?: string;
  collections?: string;
}

// type Session = {
//     user: StripEmptyObjects<{
//         id: string;
//         createdAt: Date;
//         updatedAt: Date;
//         email: string;
//         emailVerified: boolean;
//         name: string;
//         image?: string | null | undefined;
//     } & {} & {
//         username?: string | null | undefined;
//         contact?: string | null | undefined;
//         role?: string | null | undefined;
//     }>;
//     session: StripEmptyObjects<{
//         id: string;
//         createdAt: Date;
//         updatedAt: Date;
//         userId: string;
//         expiresAt: Date;
//         token: string;
//         ipAddress?: string | null | undefined;
//         userAgent?: string | null | undefined;
//     } & {} & {}>;
// } | null
