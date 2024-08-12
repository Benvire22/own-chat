export interface Message {
    id: string;
    message: string;
    author: string;
    datetime: string;
}

export type MessageFromUser = Omit<Message, 'id' | 'datetime'>;