import { cache } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/**
 * Cached getSession — deduplicated per request.
 * Multiple calls across layouts/pages in the same request share ONE DB round-trip.
 */
export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});
