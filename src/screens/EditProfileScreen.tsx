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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Icon } from '../components/Icon';
import { Colors, Fonts, FontSizes, Spacing } from '../styles/constants';
import { User } from '../types';
import { DataService } from '../services/DataService';
import { RootStackParamList } from '../types';

type EditProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditProfile'>;

export const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await dataService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.name);
        setEmail(currentUser.email);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
  };

  const handleSave = async () => {
    if (!name || !email) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все обязательные поля');
      return;
    }

    setIsLoading(true);
    try {
      const updatedUser: User = {
        ...user!,
        name,
        email,
      };
      
      await dataService.saveUser(updatedUser);
      Alert.alert('Успех', 'Профиль обновлен');
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
        
        <Text style={styles.title}>Редактировать акк</Text>
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
          
          <InputField
            label="Пароль"
            value={password}
            onChangeText={setPassword}
            placeholder="Пароль"
            secureTextEntry
            icon="lock-closed-outline"
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
