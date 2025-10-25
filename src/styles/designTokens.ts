// Design Tokens - централизованные токены дизайна
// Основа для всех стилей приложения

export const DesignTokens = {
  // Цвета
  colors: {
    light: {
      primary: '#4a9eff',
      secondary: '#f8f9fa',
      background: '#ffffff',
      text: '#1a1a1a',
      textSecondary: '#6c757d',
      textLight: '#adb5bd',
      border: '#e9ecef',
      borderLight: '#f1f3f4',
      success: '#4a9eff',
      error: '#ef4444',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f8f9fa',
        100: '#e9ecef',
        200: '#dee2e6',
        300: '#ced4da',
        400: '#adb5bd',
        500: '#6c757d',
        600: '#495057',
        700: '#343a40',
        800: '#212529',
        900: '#000000',
      },
    },
    dark: {
      // Точные цвета из Figma Register - Active
      primary: '#1b1e20',           // Кнопка Register (из Figma)
      secondary: '#232627',         // Поля ввода (из Figma)
      background: '#141718',        // Основной фон (из Figma)
      text: '#ffffff',              // Заголовок "Create your Account" (из Figma)
      textSecondary: '#cbcbcb',     // "Already Have An Account? Sign In" (из Figma)
      textLight: '#acadb9',         // Placeholder текст в полях (из Figma)
      border: '#676767',            // Границы (из Figma)
      borderLight: '#c2c3cb',       // Линия разделитель (из Figma)
      success: '#4a9eff',           // Синий для активных элементов
      error: '#ef4444',             // Красный для ошибок
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#232627',   // Поля ввода (из Figma)
        100: '#232627',  // Поля ввода (из Figma)
        200: '#232627',  // Поля ввода (из Figma)
        300: '#676767',  // Границы (из Figma)
        400: '#acadb9',  // Placeholder текст (из Figma)
        500: '#acadb9',  // Placeholder текст (из Figma)
        600: '#a0a0a5',  // Серый текст (из Figma)
        700: '#cbcbcb',  // "Already Have An Account? Sign In" (из Figma)
        800: '#ffffff',  // Белый текст
        900: '#ffffff',  // Белый текст
      },
    },
  },

  // Типографика (из Figma Register - Active)
  typography: {
    fontFamily: {
      primary: {
        regular: 'Inter-Regular',
        medium: 'Inter-Medium',
        semiBold: 'Inter-SemiBold',
        bold: 'Inter-Bold',
      },
      // Шрифты из Figma
      poppins: {
        medium: 'Poppins-Medium',
        semiBold: 'Poppins-SemiBold',
        bold: 'Poppins-Bold',
      },
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
      // Точные размеры из Figma
      title: 38,              // "Create your Account" (из Figma)
      subtitle: 16,            // "Continue With Accounts" (из Figma)
      fieldText: 14,           // Текст в полях ввода (из Figma)
      buttonText: 16,          // Текст кнопки Register (из Figma)
      linkText: 14,            // "Already Have An Account? Sign In" (из Figma)
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.4,
      relaxed: 1.6,
      // Точные высоты строк из Figma
      title: 47.5,             // "Create your Account" (из Figma)
      subtitle: 24,            // "Continue With Accounts" (из Figma)
      fieldText: 21,           // Текст в полях ввода (из Figma)
      buttonText: 24,          // Текст кнопки Register (из Figma)
      linkText: 21,            // "Already Have An Account? Sign In" (из Figma)
    },
    letterSpacing: {
      tight: -0.5,
      normal: 0,
      wide: 0.5,
      // Точные letterSpacing из Figma
      title: -1.52,            // "Create your Account" (из Figma)
      subtitle: -0.16,         // "Continue With Accounts" (из Figma)
      fieldText: -0.28,        // Текст в полях ввода (из Figma)
      buttonText: -0.32,       // Текст кнопки Register (из Figma)
      linkText: -0.28,         // "Already Have An Account? Sign In" (из Figma)
    },
  },

  // Отступы и размеры (из Figma Register - Active)
  spacing: {
    0: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
    '4xl': 40,
    '5xl': 48,
    '6xl': 64,
    // Специальные отступы из Figma
    fieldPadding: 21,        // Отступ в полях ввода (из Figma)
    fieldHeight: 65.52,      // Высота полей ввода (из Figma)
    buttonHeight: 65.52,     // Высота кнопки Register (из Figma)
    buttonPadding: 16,       // Отступ в кнопке (из Figma)
  },

  // Радиусы скругления (из Figma Register - Active)
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
    // Точные радиусы из Figma
    field: 12.84,           // Поля ввода (из Figma)
    button: 14,             // Кнопка Register (из Figma)
    socialButton: 10,       // Кнопки социальных сетей (из Figma)
  },

  // Тени
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    base: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
  },

  // Брейкпоинты для адаптивности
  breakpoints: {
    mobile: 0,
    tablet: 768,
    desktop: 1024,
  },

  // Z-индексы
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Анимации
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
    easing: {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
    },
  },
} as const;

// Типы для TypeScript
export type ColorTheme = 'light' | 'dark';
export type SpacingKey = keyof typeof DesignTokens.spacing;
export type FontSizeKey = keyof typeof DesignTokens.typography.fontSize;
export type BorderRadiusKey = keyof typeof DesignTokens.borderRadius;
