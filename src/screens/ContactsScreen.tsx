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
import { StackNavigationProp } from '@react-navigation/stack';
import { Fonts, FontSizes, Spacing } from '../styles/constants';
import { Icon } from '../components/Icon';
import { Contact } from '../types';
import { DataService } from '../services/DataService';
import { MainTabParamList, RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

type ContactsScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Contacts'> & 
  StackNavigationProp<RootStackParamList>;

export const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadContacts();
  }, []);

  // Обновляем список контактов при возврате на экран
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('📱 ContactsScreen focused, reloading contacts');
      loadContacts();
    });

    return unsubscribe;
  }, [navigation]);

  const loadContacts = async () => {
    try {
      const contactsData = await dataService.getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const handleAddContact = () => {
    console.log('➕ Navigating to NewContact screen');
    navigation.navigate('NewContact');
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}
      >
        <View style={styles.contactContent}>
          <View style={styles.contactInfo}>
            <Text style={[styles.contactName, { color: colors.text }]}>{item.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
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
        
        <Text style={[styles.title, { color: colors.text }]}>Контакты</Text>
        
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddContact}
        >
          <Icon name="add" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={[styles.separator, { backgroundColor: colors.borderLight }]} />}
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
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
    letterSpacing: 0.66,
  },
  addButton: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: Spacing.lg,
  },
  contactItem: {
    paddingVertical: Spacing.md,
  },
  contactContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.primary.semiBold,
    fontWeight: '600',
  },
  separator: {
    height: 1,
  },
});
