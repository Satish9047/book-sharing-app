import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Layout({children}: Readonly<{children: React.ReactNode}>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    console.log(session);

    if (!session?.user) {
        redirect("/login");
    }

    if (session.user.role !== "admin") {
        redirect("/"); // or 403 page
    }

    return (
        <div>{children}</div>
    )
}
export default Layout;