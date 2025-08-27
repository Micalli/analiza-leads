export interface ChatsI {
  id: string;
  nome: string;
  linkedinUrl: string;
  mensagem: string;
} 

export interface GroupChatI {
  name: string;
  linkedinUrl: string;
  messages: { message: string }[];
};
