import { Suspense } from "react";
import ManageEventPageClient from "./mangeEventPageClient";

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <ManageEventPageClient />
    </Suspense>
  );
}
