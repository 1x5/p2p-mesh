import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Colors, Fonts, FontSizes, Spacing } from '../styles/constants';
import { Icon } from '../components/Icon';
import { User } from '../types';
import { DataService } from '../services/DataService';
import { MainTabParamList } from '../types';

type SettingsScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Settings'>;

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dataService = DataService.getInstance();

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const user = await dataService.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error loading current user:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await dataService.logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderSettingItem = (
    title: string,
    subtitle: string,
    icon: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode
  ) => {
    return (
      <TouchableOpacity style={styles.settingItem} onPress={onPress}>
        <View style={styles.settingContent}>
          <View style={styles.settingInfo}>
            <Icon name={icon as any} size={24} color={Colors.text} style={styles.settingIcon} />
            <View style={styles.settingText}>
              <Text style={styles.settingTitle}>{title}</Text>
              <Text style={styles.settingSubtitle}>{subtitle}</Text>
            </View>
          </View>
          {rightComponent || (
            <Icon name="chevron-forward" size={20} color={Colors.gray[400]} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      
      <View style={styles.header}>
        <Text style={styles.title}>Настройки</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderSettingItem(
          'Аккаунт',
          'Редактировать данные акаунта',
          'person-outline',
          () => navigation.navigate('EditProfile')
        )}

        {renderSettingItem(
          'Цветовая схема',
          'Изменить режим темы',
          'color-palette-outline',
          undefined,
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: Colors.gray[300], true: Colors.primary }}
            thumbColor={Colors.white}
          />
        )}

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Выйти</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSizes.xl,
    fontFamily: Fonts.primary.medium,
    fontWeight: '500',
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  settingItem: {
    marginBottom: Spacing.lg,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.primary.semiBold,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.primary.regular,
    color: Colors.gray[600],
  },
  logoutContainer: {
    marginTop: Spacing['4xl'],
    marginBottom: Spacing['4xl'],
  },
  logoutButton: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: FontSizes.base,
    fontFamily: Fonts.primary.medium,
    color: Colors.white,
    fontWeight: '500',
  },
});
