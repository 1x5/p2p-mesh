import React from 'react';
import { Platform } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: any;
}

// SVG иконки из Figma дизайна ov813lka
const SVG_ICONS = {
  'arrow-back': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" key="figma-arrow-back">
      <path d="M15 18L9 12L15 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'eye': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke={color} strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  'eye-off': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12A18.45 18.45 0 0 1 5.06 5.06L17.94 17.94Z" stroke={color} strokeWidth="1.5"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4C19 4 23 12 23 12A18.5 18.5 0 0 1 18.1 19.76L9.9 4.24Z" stroke={color} strokeWidth="1.5"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth="1.5"/>
    </svg>
  ),
  'person': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'mail': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'lock-closed': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="16" r="1" fill={color}/>
      <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'send': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'chatbubbles': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'people': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'settings': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15A1.65 1.65 0 0 0 21 13.5A1.65 1.65 0 0 0 19.4 12A1.65 1.65 0 0 0 18 10.5A1.65 1.65 0 0 0 16.6 12A1.65 1.65 0 0 0 18 13.5A1.65 1.65 0 0 0 19.4 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.6 15A1.65 1.65 0 0 0 6 13.5A1.65 1.65 0 0 0 4.6 12A1.65 1.65 0 0 0 3 10.5A1.65 1.65 0 0 0 1.6 12A1.65 1.65 0 0 0 3 13.5A1.65 1.65 0 0 0 4.6 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 1V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22 4.22L5.64 5.64" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.36 18.36L19.78 19.78" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 12H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22 19.78L5.64 18.36" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'add': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'filter': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Фильтр из Figma - три линии с точками */}
      <line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="6" r="2" fill={color}/>
      <line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="12" r="2" fill={color}/>
      <line x1="4" y1="18" x2="20" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="18" r="2" fill={color}/>
    </svg>
  ),
  'create-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M11 4H4A2 2 0 0 0 2 6V20A2 2 0 0 0 4 22H18A2 2 0 0 0 20 20V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.5 2.5A2.121 2.121 0 0 1 21 5L11 15H8V12L18.5 2.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'chevron-forward': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polyline points="9,18 15,12 9,6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Outline версии иконок для полей ввода
  'mail-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="22,6 12,13 2,6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'lock-closed-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="16" r="1" fill={color}/>
      <path d="M7 11V7A5 5 0 0 1 17 7V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'person-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Дополнительные иконки для навигации
  'chatbubbles-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'people-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21V19C23 17.9391 22.5786 16.9217 21.8284 16.1716C21.0783 15.4214 20.0609 15 19 15H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="7" r="4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'settings-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15A1.65 1.65 0 0 0 21 13.5A1.65 1.65 0 0 0 19.4 12A1.65 1.65 0 0 0 18 10.5A1.65 1.65 0 0 0 16.6 12A1.65 1.65 0 0 0 18 13.5A1.65 1.65 0 0 0 19.4 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.6 15A1.65 1.65 0 0 0 6 13.5A1.65 1.65 0 0 0 4.6 12A1.65 1.65 0 0 0 3 10.5A1.65 1.65 0 0 0 1.6 12A1.65 1.65 0 0 0 3 13.5A1.65 1.65 0 0 0 4.6 15Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 1V3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21V23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22 4.22L5.64 5.64" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.36 18.36L19.78 19.78" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 12H3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 12H23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.22 19.78L5.64 18.36" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // Дополнительные иконки для настроек
  'color-palette-outline': (size: number, color: string) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" key="figma-color-palette-outline">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 12C8 10.8954 8.89543 10 10 10C11.1046 10 12 10.8954 12 12C12 13.1046 11.1046 14 10 14C8.89543 14 8 13.1046 8 12Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8C16 6.89543 16.8954 6 18 6C19.1046 6 20 6.89543 20 8C20 9.10457 19.1046 10 18 10C16.8954 10 16 9.10457 16 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 16C16 14.8954 16.8954 14 18 14C19.1046 14 20 14.8954 20 16C20 17.1046 19.1046 18 18 18C16.8954 18 16 17.1046 16 16Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 8C8 6.89543 7.10457 6 6 6C4.89543 6 4 6.89543 4 8C4 9.10457 4.89543 10 6 10C7.10457 10 8 9.10457 8 8Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, color = '#000', style }) => {
  // Для веб-версии используем SVG иконки из Figma
  if (Platform.OS === 'web') {
    const IconComponent = SVG_ICONS[name as keyof typeof SVG_ICONS];
    if (IconComponent) {
      console.log(`🎨 Rendering Figma icon: ${name} (figma-v2)`);
      return (
        <div 
          style={{ 
            display: 'inline-block', 
            ...style 
          }}
          data-icon-version="figma-v2"
          data-icon-name={name}
        >
          {IconComponent(size, color)}
        </div>
      );
    }
    // Fallback для неизвестных иконок
    return (
      <div style={{ 
        display: 'inline-block', 
        width: size, 
        height: size, 
        backgroundColor: color,
        borderRadius: '50%',
        ...style 
      }} />
    );
  }

  // Для мобильных версий используем Ionicons
  const { Ionicons } = require('@expo/vector-icons');
  return (
    <Ionicons 
      name={name as any} 
      size={size} 
      color={color} 
      style={style} 
    />
  );
};