export interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

export interface SidebarDropdownProps extends SidebarLinkProps {
  items: { label: string; href: string }[];
}

export interface DocumentCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  uploader: {
    name: string;
    initials: string;
  };
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
