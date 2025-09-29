"use client";

import { Event } from "@/app/types/event";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

type EventListProps = {
  events?: Event[];
};

export default function EventList({ events }: EventListProps) {
  const [eventList, setEventList] = useState<Event[] | undefined>(events);

  const mockEvent: Event = {
    id: 0,
    eventName: "Mock Event",
    eventDescription: "This is a mock event for testing purposes.",
    mainImageUrl: "/golang.webp",
  };

  useEffect(() => {
    if (events) {
      setEventList(events);
    }
  }, [events]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Real Event */}
      {eventList && eventList.length > 0
        ? eventList.map((event) => <EventCard key={event.id} event={event} />)
        : null}
      {/* Mock Event */}
      <EventCard event={mockEvent} />
      <EventCard event={mockEvent} />
      <EventCard event={mockEvent} />
      <EventCard event={mockEvent} />
    </div>
  );
}
