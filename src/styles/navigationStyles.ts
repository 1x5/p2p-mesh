import { StyleSheet } from 'react-native';
import { StyleUtils } from './styleUtils';
import { DesignTokens, ColorTheme } from './designTokens';

// Специализированные стили для навигации
export const NavigationStyles = {
  // Создание стилей для нижней навигации
  createTabBarStyles: (theme: ColorTheme, insets: { bottom: number }) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      tabBar: {
        ...StyleUtils.navigation.tabBar(theme, insets),
      },
      
      tabBarLabel: {
        ...StyleUtils.navigation.tabBarLabel(theme),
      },
      
      tabBarLabelActive: {
        ...StyleUtils.navigation.tabBarLabelActive(theme),
      },
      
      tabBarIcon: {
        marginBottom: StyleUtils.getSpacing('xs'),
      },
      
      tabBarIconActive: {
        marginBottom: StyleUtils.getSpacing('xs'),
        transform: [{ scale: 1.1 }],
      },
    });
  },

  // Стили для заголовков экранов
  createHeaderStyles: (theme: ColorTheme) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      header: {
        ...StyleUtils.mixins.row,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: StyleUtils.getSpacing('lg'),
        paddingVertical: StyleUtils.getSpacing('lg'),
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
      },
      
      headerTitle: {
        fontSize: StyleUtils.responsive.fontSize('xl', '2xl'),
        fontFamily: DesignTokens.typography.fontFamily.primary.medium,
        fontWeight: '500',
        color: colors.text,
        textAlign: 'center',
        flex: 1,
      },
      
      headerButton: {
        width: 45,
        height: 45,
        ...StyleUtils.mixins.centerContent,
        borderRadius: StyleUtils.getBorderRadius('base'),
      },
      
      headerButtonLarge: {
        width: 64,
        height: 64,
        ...StyleUtils.mixins.centerContent,
        borderRadius: StyleUtils.getBorderRadius('base'),
      },
      
      backButton: {
        ...StyleUtils.mixins.centerContent,
        marginRight: StyleUtils.getSpacing('md'),
      },
    });
  },

  // Стили для контейнеров экранов
  createScreenStyles: (theme: ColorTheme) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      container: {
        ...StyleUtils.mixins.fullScreen,
        backgroundColor: colors.background,
      },
      
      safeArea: {
        ...StyleUtils.mixins.fullScreen,
        backgroundColor: colors.secondary,
      },
      
      content: {
        flex: 1,
        paddingHorizontal: StyleUtils.responsive.spacing('lg', 'xl', '2xl'),
        paddingTop: StyleUtils.getSpacing('3xl'),
      },
      
      contentCentered: {
        ...StyleUtils.mixins.fullScreen,
        ...StyleUtils.mixins.centerContent,
        paddingHorizontal: StyleUtils.responsive.spacing('lg', 'xl', '2xl'),
      },
      
      scrollContent: {
        paddingHorizontal: StyleUtils.responsive.spacing('lg', 'xl', '2xl'),
        paddingBottom: StyleUtils.getSpacing('4xl'),
      },
    });
  },

  // Стили для списков
  createListStyles: (theme: ColorTheme) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      listContainer: {
        paddingHorizontal: StyleUtils.getSpacing('lg'),
      },
      
      listItem: {
        paddingVertical: StyleUtils.getSpacing('md'),
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
      },
      
      listItemLast: {
        paddingVertical: StyleUtils.getSpacing('md'),
        borderBottomWidth: 0,
      },
      
      listItemContent: {
        ...StyleUtils.mixins.row,
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      
      listItemInfo: {
        flex: 1,
        marginLeft: StyleUtils.getSpacing('md'),
      },
      
      listItemTitle: {
        fontSize: StyleUtils.getFontSize('base'),
        fontFamily: DesignTokens.typography.fontFamily.primary.semiBold,
        fontWeight: '600',
        color: colors.text,
        marginBottom: 4,
      },
      
      listItemSubtitle: {
        fontSize: StyleUtils.getFontSize('sm'),
        fontFamily: DesignTokens.typography.fontFamily.primary.regular,
        color: colors.textSecondary,
      },
    });
  },

  // Стили для форм (точные стили из Figma Register - Active)
  createFormStyles: (theme: ColorTheme) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      form: {
        marginBottom: StyleUtils.getSpacing('4xl'),
      },
      
      inputGroup: {
        marginBottom: StyleUtils.getSpacing('lg'),
      },
      
      // Поля ввода точно как в Figma
      inputContainer: {
        ...StyleUtils.mixins.row,
        alignItems: 'center',
        borderRadius: DesignTokens.borderRadius.field, // 12.84 из Figma
        borderWidth: 0, // Нет границ в Figma
        paddingHorizontal: DesignTokens.spacing.fieldPadding, // 21px из Figma
        paddingVertical: StyleUtils.getSpacing('sm'),
        height: DesignTokens.spacing.fieldHeight, // 65.52px из Figma
        backgroundColor: colors.secondary, // #232627 из Figma
      },
      
      inputContainerFocused: {
        borderColor: colors.primary,
        borderWidth: 1,
      },
      
      // Текст в полях точно как в Figma
      input: {
        flex: 1,
        fontSize: DesignTokens.typography.fontSize.fieldText, // 14px из Figma
        fontFamily: DesignTokens.typography.fontFamily.poppins.medium, // Poppins Medium из Figma
        fontWeight: '500',
        color: colors.textLight, // #acadb9 из Figma
        backgroundColor: 'transparent',
        borderWidth: 0,
        lineHeight: DesignTokens.typography.lineHeight.fieldText, // 21px из Figma
        letterSpacing: DesignTokens.typography.letterSpacing.fieldText, // -0.28 из Figma
      },
      
      inputIcon: {
        marginRight: StyleUtils.getSpacing('md'),
      },
      
      errorText: {
        fontSize: DesignTokens.typography.fontSize.fieldText,
        marginTop: StyleUtils.getSpacing('xs'),
        marginLeft: StyleUtils.getSpacing('md'),
        color: colors.error,
      },
    });
  },

  // Стили для кнопок (точные стили из Figma Register - Active)
  createButtonStyles: (theme: ColorTheme) => {
    const colors = StyleUtils.getColors(theme);
    
    return StyleSheet.create({
      // Основная кнопка точно как в Figma
      primaryButton: {
        backgroundColor: colors.primary, // #1b1e20 из Figma
        borderRadius: DesignTokens.borderRadius.button, // 14px из Figma
        height: DesignTokens.spacing.buttonHeight, // 65.52px из Figma
        paddingHorizontal: DesignTokens.spacing.buttonPadding, // 16px из Figma
        ...StyleUtils.mixins.centerContent,
        ...StyleUtils.platform.shadow(DesignTokens.shadows.sm),
      },
      
      // Текст кнопки точно как в Figma
      primaryButtonText: {
        fontSize: DesignTokens.typography.fontSize.buttonText, // 16px из Figma
        fontFamily: DesignTokens.typography.fontFamily.poppins.medium, // Poppins Medium из Figma
        fontWeight: '500',
        color: colors.white, // #ffffff из Figma
        lineHeight: DesignTokens.typography.lineHeight.buttonText, // 24px из Figma
        letterSpacing: DesignTokens.typography.letterSpacing.buttonText, // -0.32 из Figma
      },
      
      // Вторичная кнопка
      secondaryButton: {
        backgroundColor: colors.secondary,
        borderRadius: DesignTokens.borderRadius.button,
        height: DesignTokens.spacing.buttonHeight,
        paddingHorizontal: DesignTokens.spacing.buttonPadding,
        ...StyleUtils.mixins.centerContent,
        borderWidth: 1,
        borderColor: colors.border,
      },
      
      secondaryButtonText: {
        fontSize: DesignTokens.typography.fontSize.buttonText,
        fontFamily: DesignTokens.typography.fontFamily.poppins.medium,
        fontWeight: '500',
        color: colors.text,
        lineHeight: DesignTokens.typography.lineHeight.buttonText,
        letterSpacing: DesignTokens.typography.letterSpacing.buttonText,
      },
      
      // Кнопка ошибки
      dangerButton: {
        backgroundColor: colors.error,
        borderRadius: DesignTokens.borderRadius.button,
        height: DesignTokens.spacing.buttonHeight,
        paddingHorizontal: DesignTokens.spacing.buttonPadding,
        ...StyleUtils.mixins.centerContent,
      },
      
      dangerButtonText: {
        fontSize: DesignTokens.typography.fontSize.buttonText,
        fontFamily: DesignTokens.typography.fontFamily.poppins.medium,
        fontWeight: '500',
        color: colors.white,
        lineHeight: DesignTokens.typography.lineHeight.buttonText,
        letterSpacing: DesignTokens.typography.letterSpacing.buttonText,
      },
    });
  },
};

// Экспорт для удобства
export const { 
  createTabBarStyles, 
  createHeaderStyles, 
  createScreenStyles, 
  createListStyles, 
  createFormStyles,
  createButtonStyles
} = NavigationStyles;
