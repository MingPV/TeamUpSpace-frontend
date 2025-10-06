"use server";

import { TAGS } from "@/constants/tags";
import { fetchApi } from "./utils";
import { EventTag } from "../types/eventTag";
import { createClient } from "@/utils/supabase/server";

export async function fetchAllEvents() {
  const res = await fetchApi(`/api/v1/events`);
  return res.events;
}

export async function fetchEventByID(eventID: string) {
  const res = await fetchApi(`/api/v1/events/${eventID}`);
  return res.event;
}

// message CreateEventRequest {
// 	string event_name = 1;
// 	string event_description = 2;
// 	string start_at = 3;
// 	string end_at = 4;
// 	string main_image_url = 5;
// 	string register_start_dt = 6;
// 	string register_close_dt = 7;
// }

export async function createEvent(
  event_name: string,
  event_description: string,
  start_at: string,
  end_at: string,
  register_start_dt: string,
  register_close_dt: string,
  main_image?: File,
  main_image_url = ""
) {
  const supabase = await createClient();

  if (main_image) {
    const fileExt = main_image.name.split(".").pop();
    const fileName = `event-${event_name}-${Date.now()}.${fileExt}`;
    const filePath = `events/${fileName}`;
    const { error } = await supabase.storage
      .from("event-images")
      .upload(filePath, main_image, { upsert: true });
    if (error) {
      console.error("Event image upload error:", error);
      return;
    }
    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(filePath);
    main_image_url = data.publicUrl;
  }

  return fetchApi("/api/v1/events", {
    method: "POST",
    body: JSON.stringify({
      event_name,
      event_description,
      start_at,
      end_at,
      main_image_url,
      register_start_dt,
      register_close_dt,
    }),
  });
}

export async function deleteEvent(eventID: number) {
  return fetchApi(`/api/v1/events/${eventID}`, {
    method: "DELETE",
  });
}

export async function fetchTagByEventID(eventID: number) {
  const res = await fetchApi(`/api/v1/eventTags/event/${eventID}`);
  const event_tags = res.eventTags;

  const tags: string[] = event_tags.map(
    (event_tag: EventTag) =>
      TAGS[event_tag.tagId.toString() as keyof typeof TAGS]
  );

  return tags;
}

export async function fetchEventByTagID(tagID: number) {
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

export async function addTagToEvent(eventID: number, tagID: number) {
  return fetchApi(`/api/v1/eventTags`, {
    method: "POST",
    body: JSON.stringify({ event_id: eventID, tag_id: tagID }),
  });
}

export async function fetchAllTags() {
  const res = await fetchApi(`/api/v1/tags`);
  return res.tags;
}

export async function getSavedEvent(userID: string, eventID: number) {
  const res = await fetchApi(`/api/v1/savedEvents/${userID}/${eventID}`, {
    method: "GET",
  });
  return res.savedEvent;
}

export async function saveEvent(userID: string, eventID: number) {
  return fetchApi(`/api/v1/savedEvents`, {
    method: "POST",
    body: JSON.stringify({ user_id: userID, event_id: eventID }),
  });
}

export async function removeSavedEvent(userID: string, eventID: number) {
  return fetchApi(`/api/v1/savedEvents/${userID}/${eventID}`, {
    method: "DELETE",
  });
}
