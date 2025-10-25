import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { EncryptionService } from './src/services/EncryptionService';
import { ThemeProvider } from './src/contexts/ThemeContext';
import './src/styles/webFonts'; // Подключение шрифтов для веб

export default function App() {
  useEffect(() => {
    console.log('🚀 App starting...');
    
    // Инициализируем сервис шифрования при запуске приложения
    const initializeEncryption = async () => {
      try {
        console.log('🔐 Initializing encryption service...');
        const encryptionService = EncryptionService.getInstance();
        await encryptionService.loadKeys();
        
        // Если ключей нет, генерируем новые
        if (!encryptionService.getPublicKey()) {
          console.log('🔑 Generating new encryption keys...');
          await encryptionService.generateKeyPair();
        }
        console.log('✅ Encryption service initialized successfully');
      } catch (error) {
        console.error('❌ Error initializing encryption:', error);
      }
    };

    initializeEncryption();
  }, []);

  console.log('📱 App component rendering...');
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}