import { Suspense } from "react";
import ErrorClient from "./error-client";

export const dynamic = "force-dynamic";

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
      <ErrorClient />
    </Suspense>
  );
}
