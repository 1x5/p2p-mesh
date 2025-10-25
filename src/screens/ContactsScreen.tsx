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
import { Colors, Fonts, FontSizes, Spacing } from '../styles/constants';
import { Icon } from '../components/Icon';
import { Contact } from '../types';
import { DataService } from '../services/DataService';
import { MainTabParamList } from '../types';

type ContactsScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Contacts'>;

export const ContactsScreen: React.FC = () => {
  const navigation = useNavigation<ContactsScreenNavigationProp>();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const contactsData = await dataService.getContacts();
      setContacts(contactsData);
    } catch (error) {
      console.error('Error loading contacts:', error);
    }
  };

  const renderContactItem = ({ item }: { item: Contact }) => {
    return (
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() => navigation.navigate('ContactDetails', { contactId: item.id })}
      >
        <View style={styles.contactContent}>
          <View style={styles.contactInfo}>
            <Text style={styles.contactName}>{item.name}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="create-outline" size={16} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Контакты</Text>
        
        <TouchableOpacity style={styles.addButton}>
          <Icon name="add" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContactItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    color: Colors.text,
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
    color: Colors.text,
  },
  editButton: {
    padding: Spacing.sm,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.gray[200],
  },
});
