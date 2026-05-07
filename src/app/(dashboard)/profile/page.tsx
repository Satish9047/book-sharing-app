import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileClient from "./profile.client";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <ProfileClient session={session} />;
};

export default ProfilePage;
