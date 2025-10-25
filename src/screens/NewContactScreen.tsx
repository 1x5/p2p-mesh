import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Icon } from '../components/Icon';
import { Fonts, FontSizes, Spacing } from '../styles/constants';
import { Contact } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { DataService } from '../services/DataService';
import { RootStackParamList } from '../types';

type NewContactScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewContact'>;

export const NewContactScreen: React.FC = () => {
  const navigation = useNavigation<NewContactScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dataService = DataService.getInstance();

  const handleAdd = async () => {
    if (!name || !email) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);
    try {
      const newContact: Contact = {
        id: Date.now().toString(),
        name,
        email,
        isOnline: false,
      };
      
      await dataService.saveContact(newContact);
      Alert.alert('Успех', 'Контакт добавлен');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при добавлении контакта');
    } finally {
      setIsLoading(false);
    }
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
        
        <Text style={[styles.title, { color: colors.text }]}>Новый контакт</Text>
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
            title="Добавить"
            onPress={handleAdd}
            variant="primary"
            disabled={isLoading}
            style={styles.addButton}
          />
        </View>
      </View>
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
  },
  backButton: {
    marginRight: Spacing.md,
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
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
  addButton: {
    marginTop: Spacing['4xl'],
  },
});
