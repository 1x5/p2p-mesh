#!/usr/bin/env node

const puppeteer = require('puppeteer');

async function testSecureMessenger() {
    console.log('🚀 Запускаем тест SecureMessenger...');
    
    try {
        const browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: { width: 375, height: 812 } // iPhone X размер
        });
        
        const page = await browser.newPage();
        
        // Перехватываем console.log
        page.on('console', msg => {
            console.log(`📱 [${msg.type().toUpperCase()}] ${msg.text()}`);
        });
        
        // Перехватываем ошибки
        page.on('pageerror', error => {
            console.log(`❌ [ERROR] ${error.message}`);
        });
        
        console.log('🌐 Открываем веб-версию...');
        await page.goto('http://localhost:8081/?platform=web', { 
            waitUntil: 'networkidle0',
            timeout: 30000 
        });
        
        console.log('⏳ Ждем загрузки приложения...');
        await page.waitForTimeout(3000);
        
        // Проверяем наличие элементов
        const title = await page.$eval('h1, [data-testid="title"], .title', el => el?.textContent).catch(() => null);
        console.log('📝 Заголовок:', title || 'Не найден');
        
        // Проверяем кнопки
        const buttons = await page.$$eval('button, [role="button"]', els => 
            els.map(el => el.textContent?.trim()).filter(Boolean)
        );
        console.log('🔘 Кнопки:', buttons);
        
        // Проверяем шрифты
        const fontFamily = await page.evaluate(() => {
            const element = document.querySelector('body');
            return window.getComputedStyle(element).fontFamily;
        });
        console.log('🍎 Шрифт:', fontFamily);
        
        console.log('✅ Тест завершен успешно!');
        
        // Оставляем браузер открытым для ручной проверки
        console.log('👀 Браузер остается открытым для ручной проверки...');
        console.log('💡 Нажмите Ctrl+C для закрытия');
        
        // Ждем бесконечно
        await new Promise(() => {});
        
    } catch (error) {
        console.error('❌ Ошибка тестирования:', error.message);
        process.exit(1);
    }
}

// Проверяем, установлен ли puppeteer
try {
    require.resolve('puppeteer');
    testSecureMessenger();
} catch (e) {
    console.log('📦 Устанавливаем puppeteer...');
    const { execSync } = require('child_process');
    execSync('npm install puppeteer', { stdio: 'inherit' });
    testSecureMessenger();
}
