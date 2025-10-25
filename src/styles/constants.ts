// Импорт новой системы дизайн-токенов
export * from './designTokens';
export * from './styleUtils';
export * from './navigationStyles';

// Обратная совместимость - экспорт старых констант
import { DesignTokens } from './designTokens';

// Экспорт для обратной совместимости
export const LightColors = DesignTokens.colors.light;
export const DarkColors = DesignTokens.colors.dark;
export const Fonts = DesignTokens.typography.fontFamily;
export const FontSizes = DesignTokens.typography.fontSize;
export const Spacing = DesignTokens.spacing;
export const BorderRadius = DesignTokens.borderRadius;

// Текущая тема (по умолчанию светлая)
export let Colors = LightColors;

// Функции для управления темами (обратная совместимость)
export const setTheme = (isDark: boolean) => {
  Colors = isDark ? DarkColors : LightColors;
  console.log('🎨 Theme changed to:', isDark ? 'dark' : 'light');
};

export const getCurrentTheme = () => {
  return Colors === DarkColors ? 'dark' : 'light';
};

export const isDarkTheme = () => {
  return Colors === DarkColors;
};