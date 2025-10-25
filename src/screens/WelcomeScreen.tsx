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
import { Colors, Fonts, FontSizes, Spacing } from '../styles/constants';
import { RootStackParamList } from '../types';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC = () => {
  console.log('👋 WelcomeScreen rendering...');
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleLoginPress = () => {
    console.log('🔐 Login button pressed');
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {
    console.log('📝 Register button pressed');
    navigation.navigate('Register');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.secondary} />
      
      <View style={styles.content}>
        {/* Logo из Figma */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>P2P</Text>
          </View>
        </View>
        
        <Text style={styles.title}>p2p mesh</Text>
        
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
    backgroundColor: Colors.secondary,
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
  logo: {
    width: 154,
    height: 184,
    backgroundColor: Colors.primary,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontFamily: Fonts.primary.bold,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 2,
  },
  title: {
    fontSize: FontSizes['6xl'],
    fontFamily: Fonts.primary.bold,
    fontWeight: '700',
    color: Colors.text,
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
