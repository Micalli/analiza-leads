export interface ChatsI {
  id: string;
  nome: string;
  to: string;
  linkedinUrl: string;
  mensagem: string;
}

export interface GroupChatI {
  id: string;
  name: string;
  linkedinUrl: string;
  messages: {  content: string; from: string }[];
}
