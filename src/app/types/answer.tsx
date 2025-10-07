export interface Answer {
  id: number;
  postId: number;
  userId: string;
  question: string;
  answer: string;
  createdAt: string; // ISO date string

  event_name?: string;
}

export interface TeamRequest {
  answers: Answer[];
  event_name?: string;
}
