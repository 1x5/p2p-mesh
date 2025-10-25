import { Platform, Dimensions } from 'react-native';
import { DesignTokens, ColorTheme, SpacingKey, FontSizeKey, BorderRadiusKey } from './designTokens';

// Получение размеров экрана
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Утилитарные функции для работы со стилями
export const StyleUtils = {
  // Получение цветов по теме
  getColors: (theme: ColorTheme) => DesignTokens.colors[theme],

  // Получение отступов
  getSpacing: (key: SpacingKey) => DesignTokens.spacing[key],

  // Получение размеров шрифта
  getFontSize: (key: FontSizeKey) => DesignTokens.typography.fontSize[key],

  // Получение радиуса скругления
  getBorderRadius: (key: BorderRadiusKey) => DesignTokens.borderRadius[key],

  // Адаптивные размеры
  responsive: {
    // Адаптивный размер на основе ширины экрана
    width: (mobile: number, tablet?: number, desktop?: number) => {
      if (screenWidth >= DesignTokens.breakpoints.desktop && desktop) {
        return desktop;
      }
      if (screenWidth >= DesignTokens.breakpoints.tablet && tablet) {
        return tablet;
      }
      return mobile;
    },

    // Адаптивный размер шрифта
    fontSize: (mobile: FontSizeKey, tablet?: FontSizeKey, desktop?: FontSizeKey) => {
      const mobileSize = DesignTokens.typography.fontSize[mobile];
      const tabletSize = tablet ? DesignTokens.typography.fontSize[tablet] : mobileSize;
      const desktopSize = desktop ? DesignTokens.typography.fontSize[desktop] : tabletSize;

      if (screenWidth >= DesignTokens.breakpoints.desktop) {
        return desktopSize;
      }
      if (screenWidth >= DesignTokens.breakpoints.tablet) {
        return tabletSize;
      }
      return mobileSize;
    },

    // Адаптивные отступы
    spacing: (mobile: SpacingKey, tablet?: SpacingKey, desktop?: SpacingKey) => {
      const mobileSpacing = DesignTokens.spacing[mobile];
      const tabletSpacing = tablet ? DesignTokens.spacing[tablet] : mobileSpacing;
      const desktopSpacing = desktop ? DesignTokens.spacing[desktop] : tabletSpacing;

      if (screenWidth >= DesignTokens.breakpoints.desktop) {
        return desktopSpacing;
      }
      if (screenWidth >= DesignTokens.breakpoints.tablet) {
        return tabletSpacing;
      }
      return mobileSpacing;
    },
  },

  // Платформо-специфичные стили
  platform: {
    // Отступы для iOS с учетом safe area
    safeAreaPadding: (insets: { bottom: number; top: number }, basePadding: number = 0) => ({
      paddingTop: Platform.OS === 'ios' ? insets.top + basePadding : basePadding,
      paddingBottom: Platform.OS === 'ios' ? insets.bottom + basePadding : basePadding,
    }),

    // Высота с учетом safe area
    safeAreaHeight: (baseHeight: number, insets: { bottom: number }) => ({
      height: Platform.OS === 'ios' ? baseHeight + insets.bottom : baseHeight,
    }),

    // Тени (только для iOS, elevation для Android)
    shadow: (shadowConfig: typeof DesignTokens.shadows.base) => {
      if (Platform.OS === 'ios') {
        return shadowConfig;
      }
      return {
        elevation: shadowConfig.elevation,
      };
    },
  },

  // Создание стилей с условной логикой
  conditional: {
    // Условные стили на основе булевого значения
    if: (condition: boolean, trueStyle: any, falseStyle: any = {}) => 
      condition ? trueStyle : falseStyle,

    // Условные стили на основе темы
    theme: (theme: ColorTheme, lightStyle: any, darkStyle: any) =>
      theme === 'light' ? lightStyle : darkStyle,

    // Условные стили на основе платформы
    platform: (iosStyle: any, androidStyle: any) =>
      Platform.OS === 'ios' ? iosStyle : androidStyle,
  },

  // Создание миксинов для повторяющихся стилей
  mixins: {
    // Центрирование контента
    centerContent: {
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
    },

    // Полноэкранный контейнер
    fullScreen: {
      flex: 1,
      width: '100%',
      height: '100%',
    },

    // Горизонтальный контейнер
    row: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
    },

    // Вертикальный контейнер
    column: {
      flexDirection: 'column' as const,
    },

    // Скрытие элемента
    hidden: {
      display: 'none' as const,
    },

    // Абсолютное позиционирование
    absolute: {
      position: 'absolute' as const,
    },

    // Относительное позиционирование
    relative: {
      position: 'relative' as const,
    },
  },

  // Создание стилей для навигации
  navigation: {
    // Стили для нижней навигации
    tabBar: (theme: ColorTheme, insets: { bottom: number }) => {
      const colors = StyleUtils.getColors(theme);
      const baseHeight = StyleUtils.responsive.width(90, 100, 110);
      
      return {
        backgroundColor: colors.background,
        borderTopColor: colors.borderLight,
        borderTopWidth: 1,
        paddingBottom: Platform.OS === 'ios' ? insets.bottom + 12 : 20,
        paddingTop: StyleUtils.getSpacing('lg'),
        height: Platform.OS === 'ios' ? baseHeight + insets.bottom : baseHeight,
        paddingHorizontal: StyleUtils.getSpacing('xl'),
        ...StyleUtils.platform.shadow(DesignTokens.shadows.sm),
      };
    },

    // Стили для лейблов навигации
    tabBarLabel: (theme: ColorTheme) => {
      const colors = StyleUtils.getColors(theme);
      
      return {
        fontFamily: DesignTokens.typography.fontFamily.primary.medium,
        fontSize: StyleUtils.responsive.fontSize('sm', 'base'),
        marginTop: StyleUtils.getSpacing('sm'),
        marginBottom: StyleUtils.getSpacing('sm'),
        color: colors.textSecondary,
      };
    },

    // Стили для активного лейбла
    tabBarLabelActive: (theme: ColorTheme) => {
      const colors = StyleUtils.getColors(theme);
      
      return {
        ...StyleUtils.navigation.tabBarLabel(theme),
        color: colors.success,
        fontWeight: '600' as const,
      };
    },
  },
};

// Экспорт для удобства
export const { getColors, getSpacing, getFontSize, getBorderRadius } = StyleUtils;
export const { responsive, platform, conditional, mixins, navigation } = StyleUtils;
