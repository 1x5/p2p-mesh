import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Fonts, FontSizes, Spacing } from '../styles/constants';
import { Icon } from '../components/Icon';
import { Chat, User } from '../types';
import { DataService } from '../services/DataService';
import { MainTabParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

type ChatsScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Chats'>;

export const ChatsScreen: React.FC = () => {
  const navigation = useNavigation<ChatsScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [chats, setChats] = useState<Chat[]>([]);
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const chatsData = await dataService.getChats();
      setChats(chatsData);
    } catch (error) {
      console.error('Error loading chats:', error);
    }
  };

  const renderChatItem = ({ item }: { item: Chat }) => {
    const contact = item.participants[0]; // Для индивидуальных чатов
    
    return (
      <TouchableOpacity
        style={[styles.chatItem, { borderBottomColor: colors.borderLight }]}
        onPress={() => navigation.navigate('Chat', { 
          chatId: item.id, 
          contactName: contact.name 
        })}
      >
        <View style={styles.chatContent}>
          <View style={styles.chatInfo}>
            <Text style={[styles.contactName, { color: colors.text }]}>{contact.name}</Text>
            <Text style={[styles.lastMessage, { color: colors.textSecondary }]}>
              {item.lastMessage?.text || 'Нет сообщений'}
            </Text>
          </View>
          <View style={styles.chatMeta}>
            <Text style={[styles.timestamp, { color: colors.textSecondary }]}>
              {item.lastMessage ? 
                new Date(item.lastMessage.timestamp).toLocaleDateString() : 
                ''
              }
            </Text>
            {item.unreadCount > 0 && (
              <View style={[styles.unreadBadge, { backgroundColor: colors.success }]}>
                <Text style={[styles.unreadText, { color: colors.white }]}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.background} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Чаты</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
    letterSpacing: 0.66,
  },
  filterButton: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
  },
  chatItem: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  chatContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.primary.semiBold,
    fontWeight: '600',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.primary.regular,
    opacity: 0.5,
  },
  chatMeta: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.primary.regular,
    opacity: 0.5,
    marginBottom: 4,
  },
  unreadBadge: {
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadText: {
    fontSize: FontSizes.xs,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
  },
});
