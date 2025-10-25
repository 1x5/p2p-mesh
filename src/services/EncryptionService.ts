import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export class EncryptionService {
  private static instance: EncryptionService;
  private privateKey: string | null = null;
  private publicKey: string | null = null;

  static getInstance(): EncryptionService {
    if (!EncryptionService.instance) {
      EncryptionService.instance = new EncryptionService();
    }
    return EncryptionService.instance;
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

  async generateKeyPair(): Promise<{ publicKey: string; privateKey: string }> {
    try {
      // Генерируем случайные ключи для демонстрации
      // В реальном приложении используйте криптографически стойкие алгоритмы
      const publicKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `public_${Date.now()}_${Math.random()}`
      );
      
      const privateKey = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        `private_${Date.now()}_${Math.random()}`
      );

      this.publicKey = publicKey;
      this.privateKey = privateKey;

      // Сохраняем ключи в безопасном хранилище
      await this.setItem('publicKey', publicKey);
      await this.setItem('privateKey', privateKey);

      return { publicKey, privateKey };
    } catch (error) {
      console.error('Error generating key pair:', error);
      throw error;
    }
  }

  async loadKeys(): Promise<void> {
    try {
      this.publicKey = await this.getItem('publicKey');
      this.privateKey = await this.getItem('privateKey');
    } catch (error) {
      console.error('Error loading keys:', error);
    }
  }

  async encryptMessage(message: string, recipientPublicKey: string): Promise<string> {
    try {
      // Простое шифрование для демонстрации
      // В реальном приложении используйте AES или другие стойкие алгоритмы
      const combined = `${message}_${recipientPublicKey}_${this.privateKey}`;
      const encrypted = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        combined
      );
      return encrypted;
    } catch (error) {
      console.error('Error encrypting message:', error);
      throw error;
    }
  }

  async decryptMessage(encryptedMessage: string, senderPublicKey: string): Promise<string> {
    try {
      // Простое дешифрование для демонстрации
      // В реальном приложении используйте соответствующий алгоритм дешифрования
      const combined = `${encryptedMessage}_${senderPublicKey}_${this.privateKey}`;
      const decrypted = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        combined
      );
      return decrypted;
    } catch (error) {
      console.error('Error decrypting message:', error);
      throw error;
    }
  }

  getPublicKey(): string | null {
    return this.publicKey;
  }

  async hashPassword(password: string): Promise<string> {
    return await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const hashed = await this.hashPassword(password);
    return hashed === hashedPassword;
  }
}
