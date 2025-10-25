import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { Fonts, FontSizes, Spacing } from '../styles/constants';
import { RootStackParamList } from '../types';
import { useTheme } from '../contexts/ThemeContext';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
  console.log('👋 WelcomeScreen rendering...');
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const { isDarkMode, colors } = useTheme();

  const handleLoginPress = () => {
    console.log('🔐 Login button pressed');
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    console.log('📝 Register button pressed');
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.secondary }]}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor={colors.secondary} />
      
      <View style={styles.content}>
        {/* Логотип из файла logo222.svg */}
        <View style={styles.logoContainer}>
          <Logo size={154} />
        </View>
        
        <Text style={[styles.title, { color: colors.text }]}>p2p mesh</Text>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Войти"
            onPress={handleLoginPress}
            variant="primary"
            style={styles.button}
          />
          
          <Button
            title="Зарегистрироваться"
            onPress={handleRegisterPress}
            variant="secondary"
            style={styles.button}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing['4xl'],
  },
  logoContainer: {
    marginBottom: Spacing['4xl'],
  },
  title: {
    fontSize: FontSizes['6xl'],
    fontFamily: Fonts.primary.bold,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: Spacing['4xl'],
  },
  buttonContainer: {
    width: '100%',
    gap: Spacing.lg,
  },
  button: {
    width: '100%',
  },
});
