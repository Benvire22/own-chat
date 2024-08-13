export interface Message {
  id: string;
  author: string;
  message: string;
  datetime: string
}

export interface UserMessage {
  author: string;
  message: string;
}