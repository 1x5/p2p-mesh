import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Fonts, FontSizes, BorderRadius } from '../styles/constants';
import { Icon } from './Icon';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  icon?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  icon,
  style,
  inputStyle,
  labelStyle,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        {icon && (
                 <Icon
                   name={icon as any}
                   size={18}
                   color={Colors.gray[400]}
                   style={styles.icon}
                 />
        )}
        <TextInput
          style={[
            styles.input,
            isFocused && styles.focusedInput,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder || label}
          placeholderTextColor={Colors.gray[400]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={styles.eyeIcon}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={18}
              color={Colors.gray[400]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.base,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 65,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: FontSizes.base,
    fontFamily: Fonts.primary.medium,
    color: Colors.text,
    letterSpacing: -0.28,
    fontWeight: '500',
  },
  focusedInput: {
    borderColor: Colors.primary,
  },
  eyeIcon: {
    padding: 4,
  },
});
