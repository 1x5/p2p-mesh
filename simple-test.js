#!/usr/bin/env node

const http = require('http');
const { exec } = require('child_process');

console.log('🚀 Тестируем SecureMessenger...');

// Функция для проверки HTTP ответа
function checkServer(url, description) {
    return new Promise((resolve) => {
        const req = http.get(url, (res) => {
            console.log(`✅ ${description}: ${res.statusCode}`);
            resolve(true);
        });
        
        req.on('error', (err) => {
            console.log(`❌ ${description}: ${err.message}`);
            resolve(false);
        });
        
        req.setTimeout(5000, () => {
            console.log(`⏰ ${description}: Timeout`);
            req.destroy();
            resolve(false);
        });
    });
}

// Функция для проверки процесса
function checkProcess() {
    return new Promise((resolve) => {
        exec('ps aux | grep "expo start" | grep -v grep', (error, stdout) => {
            if (stdout.trim()) {
                console.log('✅ Expo сервер запущен');
                resolve(true);
            } else {
                console.log('❌ Expo сервер не найден');
                resolve(false);
            }
        });
    });
}

async function runTests() {
    console.log('📊 Результаты тестирования:');
    console.log('='.repeat(50));
    
    // Тест 1: Проверка процесса
    await checkProcess();
    
    // Тест 2: Проверка статуса
    await checkServer('http://localhost:8081/status', 'Статус сервера');
    
    // Тест 3: Проверка веб-версии
    await checkServer('http://localhost:8081/?platform=web', 'Веб-версия');
    
    // Тест 4: Проверка мета-данных
    await checkServer('http://localhost:8081/metro', 'Metro bundler');
    
    console.log('='.repeat(50));
    console.log('🌐 Открываем браузер для ручной проверки...');
    
    // Открываем браузер
    exec('open "http://localhost:8081/?platform=web"', (error) => {
        if (error) {
            console.log('❌ Ошибка открытия браузера:', error.message);
        } else {
            console.log('✅ Браузер открыт');
        }
    });
    
    console.log('💡 Проверьте консоль браузера (F12) для логов приложения');
    console.log('🔍 Ищите сообщения с эмодзи: 🚀, 🔐, 👋, 📱');
}

runTests().catch(console.error);
