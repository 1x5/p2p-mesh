export const Colors = {
  // Основные цвета из Figma дизайна
  primary: '#141718',        // Основной темный цвет
  secondary: '#f7f8fa',     // Светло-серый фон
  background: '#ffffff',    // Белый фон
  text: '#212121',          // Основной текст
  textSecondary: '#737373', // Вторичный текст
  textLight: '#cbcbcb',     // Светлый текст
  border: '#e1e1e1',        // Границы
  borderLight: '#dadada',   // Светлые границы
  success: '#163580',       // Синий для активных элементов
  error: '#ff4444',         // Красный для ошибок
  white: '#ffffff',
  black: '#000000',
  // Дополнительные цвета из дизайна
  gray: {
    50: '#fafbfb',   // Очень светлый серый
    100: '#f5f6fa',  // Светло-серый
    200: '#e9e9e9',  // Серый для логотипа
    300: '#e3e3e3',  // Серый для кнопок
    400: '#cbcbcb',  // Светло-серый текст
    500: '#a3a3a8',  // Серый текст
    600: '#918fb7',  // Фиолетово-серый
    700: '#616161',  // Темно-серый
    800: '#323142',  // Очень темно-серый
    900: '#111827',  // Почти черный
  },
};

export const Fonts = {
  // Современные шрифты без засечек для веб
  urbanist: {
    regular: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    bold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  poppins: {
    regular: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    medium: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    semiBold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    bold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  notoSans: {
    regular: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    bold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  // Основной шрифт для всего приложения
  primary: {
    regular: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    medium: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    semiBold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    bold: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

export const FontSizes = {
  // Размеры шрифтов из Figma дизайна
  xs: 12,      // Мелкий текст
  sm: 13.5,    // Небольшой текст
  base: 14,    // Основной текст
  md: 15,      // Средний текст
  lg: 16,      // Большой текст
  xl: 17,      // Заголовки
  '2xl': 18,   // Большие заголовки
  '3xl': 22,   // Очень большие заголовки
  '4xl': 24,   // Огромные заголовки
  '5xl': 38,   // Супер заголовки
  '6xl': 40,   // Максимальные заголовки
};

export const Spacing = {
  // Отступы из Figma дизайна
  xs: 4,       // Минимальный отступ
  sm: 8,       // Маленький отступ
  base: 12,    // Базовый отступ
  md: 16,      // Средний отступ
  lg: 20,      // Большой отступ
  xl: 24,      // Очень большой отступ
  '2xl': 32,   // Максимальный отступ
  '3xl': 48,   // Супер отступ
  '4xl': 64,   // Максимальный отступ
};

export const BorderRadius = {
  // Радиусы скругления из Figma дизайна
  sm: 7,       // Маленький радиус
  base: 12,    // Базовый радиус
  md: 14,      // Средний радиус
  lg: 15,      // Большой радиус
  xl: 16,      // Очень большой радиус
  '2xl': 18,   // Максимальный радиус
  '3xl': 95,   // Супер радиус для кнопок
  full: 9999,  // Полный круг
};
