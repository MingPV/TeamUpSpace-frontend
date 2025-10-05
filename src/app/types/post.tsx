export interface Post {
  id?: number;
  postBy?: string; // User ID of the post creator
  title?: string; // Title of the post
  detail?: string; // Content/detail of the post
  imageUrl?: string; // URL of the image associated with the post
  eventId?: number; // ID of the associated event, if any
  status?: string; // Status of the post (e.g., "active", "inactive")
  commentsCount?: number; // Number of comments on the post
  likesCount?: number; // Number of likes on the post
  createdAt?: string; // ISO date string for when the post was created
  updatedAt?: string; // ISO date string for when the post was last updated
}

export interface PostLike {
  postId?: number;
  userId?: string;
  createdAt?: string;
}

export interface PostReport {
  id: number;
  postId: number;
  reporter: string; // User ID of the reporter
  reportTo: string; // User ID of the reported user
  detail: string; // Detail of the report
  status: string; // Status of the report (e.g., "pending", "resolved")
  createdAt: string; // ISO date string for when the report was created
  updatedAt: string; // ISO date string for when the report was last updated
}

export interface UserReport {
  id: number;
  reporter: string; // User ID of the reporter
  reportTo: string; // User ID of the reported user
  detail: string; // Detail of the report
  status: string; // Status of the report (e.g., "pending", "resolved")
  createdAt: string; // ISO date string for when the report was created
}
