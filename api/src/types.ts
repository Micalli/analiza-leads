export interface ChatsI {
  id: string;
  nome: string;
  mensagem: string;
}

export interface GroupChatI {
  name: string;
  messages: { message: string }[];
};
