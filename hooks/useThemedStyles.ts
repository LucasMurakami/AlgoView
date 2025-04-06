import { useTheme } from '@/contexts/ThemeContext';

export const colors = {
  light: {
    background: '#f8f9fc',
    card: '#ffffff',
    text: '#1f2937',
    secondaryText: '#6b7280',
    accent: '#3b82f6',
    accentDark: '#2563eb',
    border: '#e5e7eb',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    rarityCommon: '#9ca3af',
    rarityRare: '#3b82f6',
    rarityEpic: '#8b5cf6',
    rarityLegendary: '#f59e0b',
    gachaGradientStart: '#c7d2fe',
    gachaGradientEnd: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  dark: {
    background: '#111827',
    card: '#1f2937',
    text: '#f3f4f6',
    secondaryText: '#9ca3af',
    accent: '#3b82f6',
    accentDark: '#2563eb',
    border: '#374151',
    success: '#10b981',
    danger: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    rarityCommon: '#9ca3af',
    rarityRare: '#60a5fa',
    rarityEpic: '#a78bfa',
    rarityLegendary: '#fbbf24',
    gachaGradientStart: '#1e3a8a',
    gachaGradientEnd: '#3b82f6',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },
};

export const useThemedStyles = () => {
  const { isDarkMode } = useTheme();
  
  const theme = isDarkMode ? colors.dark : colors.light;
  
  return {
    colors: theme,
    isDarkMode,
  };
};