// Глобальные стили для веб-версии
import { Platform } from 'react-native';

// Подключение шрифта Inter для веб
if (Platform.OS === 'web') {
  // Создаем элемент link для подключения Google Fonts
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = 'https://fonts.googleapis.com';
  document.head.appendChild(link);

  const link2 = document.createElement('link');
  link2.rel = 'preconnect';
  link2.href = 'https://fonts.gstatic.com';
  link2.crossOrigin = 'anonymous';
  document.head.appendChild(link2);

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // Подключаем Ionicons для веб
  const ioniconsLink = document.createElement('link');
  ioniconsLink.rel = 'stylesheet';
  ioniconsLink.href = 'https://cdn.jsdelivr.net/npm/ionicons@7.1.0/dist/ionicons/ionicons.css';
  document.head.appendChild(ioniconsLink);

  // Применяем шрифт ко всем элементам
  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    
    /* Стили для React Native Web компонентов */
    div, span, p, h1, h2, h3, h4, h5, h6, button, input, textarea {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
    }
    
    /* Стили для иконок Ionicons */
    [class*="ion-"], [class*="Ionicons"] {
      font-family: 'Ionicons', 'ionicons' !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    
    /* Специальные стили для иконок в React Native Web */
    .expo-vector-icons {
      font-family: 'Ionicons', 'ionicons' !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      line-height: 1 !important;
      -webkit-font-smoothing: antialiased !important;
      -moz-osx-font-smoothing: grayscale !important;
    }
    
    /* Дополнительные стили для правильного отображения иконок */
    ion-icon {
      font-family: 'Ionicons', 'ionicons' !important;
    }
  `;
  document.head.appendChild(style);
}
