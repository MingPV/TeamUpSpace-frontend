import { TAGS } from "@/constants/tags";
import { fetchApi } from "./utils";
import { EventTag } from "../types/eventTag";

export async function fetchAllEvents() {
  const res = await fetchApi(`/api/v1/events`);
  return res.events;
}

export async function fetchEventByID(eventID: string) {
  const res = await fetchApi(`/api/v1/events/${eventID}`);
  return res.event;
}

export async function fetchTagByEventID(eventID: string) {
  const res = await fetchApi(`/api/v1/eventTags/event/${eventID}`);
  const event_tags = res.event_tags;

  const tags: string[] = event_tags.map(
    (event_tag: EventTag) =>
      TAGS[event_tag.tagId.toString() as keyof typeof TAGS]
  );

  return tags;
}

export async function fetchEventByTagID(tagID: string) {
  const res = await fetchApi(`/api/v1/eventTags/tag/${tagID}`);
  const events_tags = res.event_tags;

  const events: number[] = events_tags.map(
    (event_tag: EventTag) => event_tag.eventId
  );

  return events;
}

export async function fetchAllEventTags() {
  const res = await fetchApi(`/api/v1/eventTags`);
  return res.eventTags;
}

export async function fetchAllTags() {
  const res = await fetchApi(`/api/v1/tags`);
  return res.tags;
}
