import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { Icon } from '../components/Icon';
import { Fonts, FontSizes, Spacing, BorderRadius } from '../styles/constants';
import { DataService } from '../services/DataService';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { colors, isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dataService = DataService.getInstance();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля');
      return;
    }

    setIsLoading(true);
    try {
      const user = await dataService.login(email, password);
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        Alert.alert('Ошибка', 'Неверный email или пароль');
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.secondary }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.secondary} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Войти</Text>
        
        <View style={styles.form}>
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
            title="Войти"
            onPress={handleLogin}
            variant="primary"
            disabled={isLoading}
            style={styles.loginButton}
          />
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.gray[400] }]}>Создать новый акаунт? </Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={[styles.linkText, { color: colors.gray[400] }]}>Создать</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.divider, { backgroundColor: colors.gray[300] }]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  backButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing['4xl'],
    paddingTop: Spacing['3xl'],
  },
  title: {
    fontSize: FontSizes['5xl'],
    fontFamily: Fonts.primary.semiBold,
    fontWeight: '600',
    marginBottom: Spacing['4xl'],
    letterSpacing: -1.52,
  },
  form: {
    marginBottom: Spacing['4xl'],
  },
  input: {
    marginBottom: Spacing.lg,
  },
  loginButton: {
    marginTop: Spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  footerText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.primary.medium,
    letterSpacing: -0.28,
  },
  linkText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.primary.medium,
    letterSpacing: -0.28,
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    marginHorizontal: -Spacing['4xl'],
  },
});
