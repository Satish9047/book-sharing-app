import { auth } from "@/lib/auth";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
  matcher: ["/upload/:path*", "/admin-dashboard/:path*", "/users/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    !["/upload", "/admin-dashboard", "/users"].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return NextResponse.next();
  }

  let session = null;

  try {
    session = await auth.api.getSession({ headers: req.headers });
  } catch (error) {
    session = null;
  }

  if (!session?.user) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const adminOnlyPaths = ["/admin-dashboard", "/users"];
  if (
    adminOnlyPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    ) &&
    session.user.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
