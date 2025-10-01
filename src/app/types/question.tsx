// message Question {
//     int32 id = 1;
//     int32 post_id = 2;
//     string question = 3;
//     google.protobuf.Timestamp created_at = 4;
//     google.protobuf.Timestamp updated_at = 5;
// }

export interface Question {
  id?: number;
  postId?: number;
  question?: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}
