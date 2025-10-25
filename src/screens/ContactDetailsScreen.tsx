import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { InputField } from '../components/InputField';
import { Colors, Fonts, FontSizes, Spacing } from '../styles/constants';
import { Contact } from '../types';
import { DataService } from '../services/DataService';
import { RootStackParamList } from '../types';

type ContactDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactDetails'>;
type ContactDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetails'>;

export const ContactDetailsScreen: React.FC = () => {
  const navigation = useNavigation<ContactDetailsScreenNavigationProp>();
  const route = useRoute<ContactDetailsScreenRouteProp>();
  const { contactId } = route.params;
  const [contact, setContact] = useState<Contact | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      const contacts = await dataService.getContacts();
      const foundContact = contacts.find(c => c.id === contactId);
      if (foundContact) {
        setContact(foundContact);
        setName(foundContact.name);
        setEmail(foundContact.email);
      }
    } catch (error) {
      console.error('Error loading contact:', error);
    }
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);
    try {
      const updatedContact: Contact = {
        ...contact!,
        name,
        email,
      };
      
      await dataService.saveContact(updatedContact);
      Alert.alert('Успех', 'Контакт обновлен');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при сохранении');
    } finally {
      setIsLoading(false);
    }
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
        
        <Text style={styles.title}>{contact?.name || 'Контакт'}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.form}>
          <InputField
            label="Имя"
            value={name}
            onChangeText={setName}
            placeholder="Имя"
            icon="person-outline"
            style={styles.input}
          />
          
          <InputField
            label="Почта"
            value={email}
            onChangeText={setEmail}
            placeholder="Почта"
            icon="mail-outline"
            style={styles.input}
          />
          
          <Button
            title="Сохранить"
            onPress={handleSave}
            variant="primary"
            disabled={isLoading}
            style={styles.saveButton}
          />
        </View>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing['4xl'],
    paddingTop: Spacing['3xl'],
  },
  form: {
    flex: 1,
  },
  input: {
    marginBottom: Spacing.lg,
  },
  saveButton: {
    marginTop: Spacing['4xl'],
  },
});
