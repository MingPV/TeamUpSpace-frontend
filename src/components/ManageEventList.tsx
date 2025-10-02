"use client";

import { Event } from "@/app/types/event";
import React, { useEffect, useState } from "react";
import ManageEventCard from "./ManageEventCard";

type EventListProps = {
  events?: Event[];
};

export default function ManageEventList({ events }: EventListProps) {
  const [eventList, setEventList] = useState<Event[] | undefined>(events);

  const mockEvent: Event = {
    id: 1,
    eventName: "Mock Event",
    eventDescription: "This is a mock event for testing purposes.",
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
        ? eventList.map((event) => (
            <ManageEventCard key={event.id} event={event} />
          ))
        : null}
      {/* Mock Event */}
      <ManageEventCard event={mockEvent} />
      <ManageEventCard event={mockEvent} />
      <ManageEventCard event={mockEvent} />
      <ManageEventCard event={mockEvent} />
    </div>
  );
}
