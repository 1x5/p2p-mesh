import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Fonts, FontSizes, Spacing, BorderRadius } from '../styles/constants';
import { Icon } from '../components/Icon';
import { Message, User } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { DataService } from '../services/DataService';
import { EncryptionService } from '../services/EncryptionService';
import { RootStackParamList } from '../types';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

export const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const route = useRoute<ChatScreenRouteProp>();
  const { chatId, contactName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const dataService = DataService.getInstance();
  const encryptionService = EncryptionService.getInstance();

  useEffect(() => {
    loadMessages();
    loadCurrentUser();
  }, []);

  const loadMessages = async () => {
    try {
      const messagesData = await dataService.getMessagesForChat(chatId);
      setMessages(messagesData);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const loadCurrentUser = async () => {
    try {
      const user = await dataService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    try {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        senderId: currentUser.id,
        receiverId: chatId,
        timestamp: Date.now(),
        isEncrypted: true,
        status: 'sent',
      };

      await dataService.saveMessage(message);
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isOwnMessage = item.senderId === currentUser?.id;
    
    return (
      <View style={[
        styles.messageContainer,
        isOwnMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        <View style={[
          styles.messageBubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
          { backgroundColor: isOwnMessage ? colors.primary : colors.secondary }
        ]}>
          <Text style={[
            styles.messageText,
            isOwnMessage ? styles.ownText : styles.otherText,
            { color: isOwnMessage ? colors.white : colors.text }
          ]}>
            {item.text}
          </Text>
        </View>
        <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
          {new Date(item.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Text style={[styles.contactName, { color: colors.text }]}>{contactName}</Text>
          <Text style={[styles.status, { color: colors.textSecondary }]}>Online</Text>
        </View>
      </View>
      
      <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.secondary, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Написать"
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    height: 54, // Точная высота из Figma
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 24, // Точный размер из Figma
    fontFamily: 'Noto Sans', // Шрифт из Figma
    fontWeight: '700',
    lineHeight: 32.688, // Точная высота строки из Figma
  },
  status: {
    fontSize: 14, // Точный размер из Figma
    fontFamily: 'Poppins', // Шрифт из Figma
    fontWeight: '500',
    lineHeight: 21, // Точная высота строки из Figma
  },
  divider: {
    height: 1,
    marginHorizontal: Spacing.lg,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg, // Больше отступ снизу для правильного позиционирования
  },
  messageContainer: {
    marginBottom: Spacing.md,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.base,
  },
  ownBubble: {
    },
  otherBubble: {
    },
  messageText: {
    fontSize: 14, // Точный размер из Figma
    fontFamily: 'Poppins', // Шрифт из Figma
    fontWeight: '400',
    letterSpacing: 0.28, // Точный letterSpacing из Figma
    lineHeight: 21, // Точная высота строки из Figma
  },
  ownText: {
    opacity: 1, // Убираем дополнительную opacity
  },
  otherText: {
    opacity: 0.83, // Точная opacity из Figma
  },
  timestamp: {
    fontSize: 12, // Точный размер из Figma
    fontFamily: 'Noto Sans', // Шрифт из Figma
    fontWeight: '400',
    lineHeight: 16.344, // Точная высота строки из Figma
    marginTop: 4,
  },
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    // Убираем верхнюю границу - в Figma её нет
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7, // Точный радиус из Figma
    height: 48, // Фиксированная высота из Figma
    paddingHorizontal: 13.96, // Точный padding из Figma
  },
  textInput: {
    flex: 1,
    fontSize: 14, // Точный размер из Figma
    fontFamily: 'Urbanist', // Шрифт из Figma
    fontWeight: '400',
    lineHeight: 22.4, // Точная высота строки из Figma
    letterSpacing: 0.2, // Точный letterSpacing из Figma
    backgroundColor: 'transparent', // Прозрачный фон, так как фон у wrapper
    borderWidth: 0, // Убираем границу, так как она у wrapper
  },
  sendButton: {
    backgroundColor: 'transparent', // Убираем черный фон
    borderRadius: 7, // Тот же радиус что и у поля ввода
    width: 32.98, // Точная ширина из Figma
    height: 33.07, // Точная высота из Figma
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8, // Небольшой отступ от текста
  },
});
