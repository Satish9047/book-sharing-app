// Auth is already enforced by middleware.ts for all /admin-dashboard and /users routes.
// No need to re-fetch the session here — that would add an extra DB round-trip.

async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}

export default Layout;