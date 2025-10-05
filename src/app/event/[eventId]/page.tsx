"use client";

// this is /event/[eventId]/page.tsx
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Event } from "@/app/types/event";
import { useState, useEffect, use } from "react";
import { fetchEventByID } from "@/app/api/event";
import EventCard from "@/components/EventCard";

type Props = {
  params: Promise<{ eventId: string }>;
};

export default function EventPage({ params }: Props) {
  const resolvedParams = use(params);
  const event_id = resolvedParams.eventId;

  const [eventId, setEventId] = useState(event_id ?? "");
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Fetch the event by ID when the component mounts
    const loadEvent = async (eventId: string) => {
      const res = await fetchEventByID(eventId);
      setEvent(res);
    };
    loadEvent(eventId);
  }, [eventId]);

  if (!event) {
    return (
      <div className="w-screen h-screen flex justify-center items-center text-base-400 font-bold">
        Loading . . .
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center w-full mt-20">
        <div className="w-[90vw] lg:w-[60vw]">
          {/* <EventBox event={event} /> */}
          <div className="text-3xl font-bold mb-4">{event.eventName}</div>
          <EventCard event={event} />
        </div>
      </div>
    </>
  );
}
