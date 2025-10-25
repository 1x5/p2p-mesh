#!/usr/bin/env node

const { exec } = require('child_process');

console.log('🔄 Принудительная перезагрузка с очисткой кэша...');

// Открываем браузер с параметрами очистки кэша
const url = 'http://localhost:8082/?platform=web&v=' + Date.now();

// Для macOS Safari
exec(`open -a Safari "${url}"`, (error) => {
  if (error) {
    console.log('Safari не найден, пробуем Chrome...');
    
    // Для Chrome с очисткой кэша
    exec(`open -a "Google Chrome" "${url}" --args --disable-web-security --disable-features=VizDisplayCompositor`, (error2) => {
      if (error2) {
        console.log('Chrome не найден, используем системный браузер...');
        exec(`open "${url}"`);
      }
    });
  }
});

console.log('✅ Браузер открыт с очисткой кэша');
console.log('💡 Если иконки все еще старые, нажмите Cmd+Shift+R для жесткой перезагрузки');
console.log('🔍 Проверьте консоль браузера (F12) на наличие data-icon-version="figma-v2"');
