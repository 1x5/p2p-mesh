export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
  isEncrypted: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isGroup: boolean;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  Chat: { chatId: string; contactName: string };
  Contacts: undefined;
  ContactDetails: { contactId: string };
  NewContact: undefined;
  Settings: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Chats: undefined;
  Contacts: undefined;
  Settings: undefined;
};
