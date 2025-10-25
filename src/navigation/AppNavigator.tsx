import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../types';
import { Colors, Fonts } from '../styles/constants';
import { Icon } from '../components/Icon';

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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
                 let iconName: string;

          if (route.name === 'Chats') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Contacts') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

                 return <Icon name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.success,
        tabBarInactiveTintColor: Colors.gray[500],
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 87,
        },
        tabBarLabelStyle: {
          fontFamily: Fonts.primary.medium,
          fontSize: 12,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Contacts" component={ContactsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  console.log('🧭 AppNavigator initializing...');
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: Colors.white },
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