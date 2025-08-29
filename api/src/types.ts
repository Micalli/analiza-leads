export interface ChatsI {
  id: string;
  nome: string;
  to: string;
  linkedinUrl: string;
  message: string;
  dateAt: string | Date;
}

export interface GroupChatI {
  id: string;
  name: string;
  linkedinUrl: string;
  lastMessageDate: string | Date;
  lastSender: string
  messages: {
    content: string;
    from: string;
    dateAt: string | Date;
  }[];
}
