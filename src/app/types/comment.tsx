// export interface Comment {
//   commentId?: number;
//   postId?: number;
//   commentBy?: string; // UUID as string
//   parentId?: number; // 0 if top-level comment
//   detail?: string;
//   createdAt?: string; // ISO date string
//   updatedAt?: string; // ISO date string
// }

export interface Comment {
  commentId?: number;
  postId?: number;
  commentBy?: string; // UUID as string
  parentId?: number; // 0 if top-level comment
  detail?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
