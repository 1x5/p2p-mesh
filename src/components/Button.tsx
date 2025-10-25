import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors, Fonts, FontSizes, BorderRadius } from '../styles/constants';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
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
  const buttonStyle = [
    styles.button,
    variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
    disabled && styles.disabledButton,
    style,
  ];

  const buttonTextStyle = [
    styles.buttonText,
    variant === 'primary' ? styles.primaryText : styles.secondaryText,
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={buttonTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 95.45, // Точный радиус из Figma
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 63.36, // Точная высота из Figma
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: '#e3e3e3', // Точный цвет из Figma
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    textAlign: 'center',
    fontFamily: Fonts.primary.bold,
  },
  primaryText: {
    color: Colors.white,
    fontFamily: Fonts.urbanist.bold,
    letterSpacing: 0.2,
  },
  secondaryText: {
    color: '#b1b1b1', // Точный цвет из Figma
    fontFamily: Fonts.urbanist.bold,
    letterSpacing: 0.19,
  },
  disabledText: {
    opacity: 0.7,
  },
});
