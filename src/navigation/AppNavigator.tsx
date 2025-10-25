import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, MainTabParamList } from '../types';
import { Fonts, createTabBarStyles } from '../styles/constants';
import { Icon } from '../components/Icon';
import { useTheme } from '../contexts/ThemeContext';

// Screens
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ChatsScreen } from '../screens/ChatsScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { ContactDetailsScreen } from '../screens/ContactDetailsScreen';
import { NewContactScreen } from '../screens/NewContactScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const { colors, isDarkMode } = useTheme();
  const insets = useSafeAreaInsets();
  
  // Используем новую систему стилей
  const tabBarStyles = createTabBarStyles(isDarkMode ? 'dark' : 'light', insets);
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'Chats') {
            iconName = 'chatbubbles-menu';
          } else if (route.name === 'Contacts') {
            iconName = 'people-menu';
          } else if (route.name === 'Settings') {
            iconName = 'settings-menu';
          } else {
            iconName = 'help-outline';
          }

          return <Icon name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.success,
        tabBarInactiveTintColor: colors.gray[500],
        tabBarStyle: tabBarStyles.tabBar,
        tabBarLabelStyle: tabBarStyles.tabBarLabel,
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="Chats" 
        component={ChatsScreen}
        options={{
          tabBarLabel: 'Чаты',
        }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Контакты',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Настройки',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  console.log('🧭 AppNavigator initializing...');
  const { colors, isDarkMode } = useTheme();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
        />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
        <Stack.Screen name="NewContact" component={NewContactScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};