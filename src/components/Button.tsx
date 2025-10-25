import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Fonts, FontSizes, BorderRadius } from '../styles/constants';
import { createButtonStyles } from '../styles/navigationStyles';
import { useTheme } from '../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors, isDarkMode } = useTheme();
  
  // Используем новые стили из Figma
  const buttonStyles = createButtonStyles(isDarkMode ? 'dark' : 'light');

  const getButtonStyle = () => {
    switch (variant) {
      case 'primary':
        return [buttonStyles.primaryButton, { opacity: disabled ? 0.6 : 1 }];
      case 'secondary':
        return [buttonStyles.secondaryButton, { opacity: disabled ? 0.6 : 1 }];
      case 'danger':
        return [buttonStyles.dangerButton, { opacity: disabled ? 0.6 : 1 }];
      default:
        return [buttonStyles.primaryButton, { opacity: disabled ? 0.6 : 1 }];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return buttonStyles.primaryButtonText;
      case 'secondary':
        return buttonStyles.secondaryButtonText;
      case 'danger':
        return buttonStyles.dangerButtonText;
      default:
        return buttonStyles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});