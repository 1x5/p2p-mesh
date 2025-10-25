import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { User, Message, Chat, Contact } from '../types';
import { EncryptionService } from './EncryptionService';

export class DataService {
  private static instance: DataService;
  private encryptionService: EncryptionService;

  constructor() {
    this.encryptionService = EncryptionService.getInstance();
  }

  static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Методы для работы с хранилищем (поддержка веб-версии)
  private async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }

  private async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  }

  private async removeItem(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  }

  // User Management
  async saveUser(user: User): Promise<void> {
    try {
      await this.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await this.getItem('currentUser');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.removeItem('currentUser');
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }

  // Messages Management
  async saveMessage(message: Message): Promise<void> {
    try {
      const messages = await this.getMessages();
      messages.push(message);
      await this.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error('Error saving message:', error);
      throw error;
    }
  }

  async getMessages(): Promise<Message[]> {
    try {
      const messagesData = await this.getItem('messages');
      return messagesData ? JSON.parse(messagesData) : [];
    } catch (error) {
      console.error('Error getting messages:', error);
      return [];
    }
  }

  async getMessagesForChat(chatId: string): Promise<Message[]> {
    try {
      const messages = await this.getMessages();
      return messages.filter(msg => 
        msg.senderId === chatId || msg.receiverId === chatId
      );
    } catch (error) {
      console.error('Error getting messages for chat:', error);
      return [];
    }
  }

  // Chats Management
  async saveChat(chat: Chat): Promise<void> {
    try {
      const chats = await this.getChats();
      const existingIndex = chats.findIndex(c => c.id === chat.id);
      if (existingIndex >= 0) {
        chats[existingIndex] = chat;
      } else {
        chats.push(chat);
      }
      await this.setItem('chats', JSON.stringify(chats));
    } catch (error) {
      console.error('Error saving chat:', error);
      throw error;
    }
  }

  async getChats(): Promise<Chat[]> {
    try {
      const chatsData = await this.getItem('chats');
      return chatsData ? JSON.parse(chatsData) : [];
    } catch (error) {
      console.error('Error getting chats:', error);
      return [];
    }
  }

  // Contacts Management
  async saveContact(contact: Contact): Promise<void> {
    try {
      const contacts = await this.getContacts();
      const existingIndex = contacts.findIndex(c => c.id === contact.id);
      if (existingIndex >= 0) {
        contacts[existingIndex] = contact;
      } else {
        contacts.push(contact);
      }
      await this.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error saving contact:', error);
      throw error;
    }
  }

  async getContacts(): Promise<Contact[]> {
    try {
      const contactsData = await this.getItem('contacts');
      return contactsData ? JSON.parse(contactsData) : [];
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  async deleteContact(contactId: string): Promise<void> {
    try {
      const contacts = await this.getContacts();
      const filteredContacts = contacts.filter(c => c.id !== contactId);
      await this.setItem('contacts', JSON.stringify(filteredContacts));
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string): Promise<User | null> {
    try {
      // В реальном приложении здесь будет проверка с сервером
      // Для демонстрации используем локальные данные
      const hashedPassword = await this.encryptionService.hashPassword(password);
      
      // Простая проверка для демонстрации
      if (email === 'test@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'Test User',
          email: email,
          isOnline: true
        };
        await this.saveUser(user);
        
        // Добавляем тестовые данные при первом входе
        await this.addTestData();
        
        return user;
      }
      return null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  }

  private async addTestData(): Promise<void> {
    try {
      // Проверяем, есть ли уже тестовые данные
      const existingContacts = await this.getContacts();
      if (existingContacts.length > 0) return;

      // Добавляем тестовые контакты
      const testContacts: Contact[] = [
        {
          id: '2',
          name: 'Andrew Parker',
          email: 'andrew@example.com',
          isOnline: true,
        },
        {
          id: '3',
          name: 'Алек макканли',
          email: 'alek@example.com',
          isOnline: false,
        },
      ];

      for (const contact of testContacts) {
        await this.saveContact(contact);
      }

      // Добавляем тестовые чаты
      const testChats: Chat[] = [
        {
          id: '2',
          participants: [testContacts[0]],
          lastMessage: {
            id: '1',
            text: 'What kind of strategy is better?',
            senderId: '2',
            receiverId: '1',
            timestamp: Date.now() - 86400000, // 1 день назад
            isEncrypted: true,
            status: 'read',
          },
          unreadCount: 0,
          isGroup: false,
        },
      ];

      for (const chat of testChats) {
        await this.saveChat(chat);
      }

      // Добавляем тестовые сообщения
      const testMessages: Message[] = [
        {
          id: '1',
          text: 'Hi, I just wanna know that how much time you\'ll be updated.',
          senderId: '2',
          receiverId: '1',
          timestamp: Date.now() - 3600000, // 1 час назад
          isEncrypted: true,
          status: 'read',
        },
        {
          id: '2',
          text: 'Maybe, Nearly July, 2022',
          senderId: '1',
          receiverId: '2',
          timestamp: Date.now() - 1800000, // 30 минут назад
          isEncrypted: true,
          status: 'read',
        },
        {
          id: '3',
          text: 'OKay, I"m Waiting....',
          senderId: '2',
          receiverId: '1',
          timestamp: Date.now() - 900000, // 15 минут назад
          isEncrypted: true,
          status: 'read',
        },
      ];

      for (const message of testMessages) {
        await this.saveMessage(message);
      }
    } catch (error) {
      console.error('Error adding test data:', error);
    }
  }

  async register(name: string, email: string, password: string): Promise<User | null> {
    try {
      const hashedPassword = await this.encryptionService.hashPassword(password);
      
      const user: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        isOnline: true
      };
      
      await this.saveUser(user);
      return user;
    } catch (error) {
      console.error('Error registering:', error);
      return null;
    }
  }
}
