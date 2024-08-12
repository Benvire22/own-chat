export interface Message {
    id: string;
    title: string;
    author: string;
    datetime: string;
}

export type MessageFromUser = Omit<Message, 'id' | 'datetime'>;