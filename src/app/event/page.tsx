import { Suspense } from "react";
import EventPageClient from "./eventPageClient";

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading events...</div>}>
      <EventPageClient />
    </Suspense>
  );
}
