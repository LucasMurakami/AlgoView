import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemedStyles } from '@/hooks/useThemedStyles';

interface ThemeSelectorProps {
  size?: 'small' | 'large';
}

const ThemeSelector = ({ size = 'large' }: ThemeSelectorProps) => {
  const { theme, setTheme } = useTheme();
  const { colors } = useThemedStyles();
  const isSmall = size === 'small';
  
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };
  
  const iconSize = isSmall ? 18 : 24;
  
  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Ionicons name="sunny" size={iconSize} color={colors.text} />;
      case 'dark':
        return <Ionicons name="moon" size={iconSize} color={colors.text} />;
      default:
        return <Ionicons name="phone-portrait" size={iconSize} color={colors.text} />;
    }
  };
  
  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Claro';
      case 'dark':
        return 'Escuro';
      default:
        return 'Sistema';
    }
  };
  
  return (
    <TouchableOpacity 
      onPress={cycleTheme}
      className={`flex-row items-center ${isSmall ? 'p-1' : 'p-2'} rounded-full`}
      style={{ backgroundColor: colors.card }}
    >
      {getIcon()}
      {!isSmall && (
        <Text className="ml-2 font-rubik" style={{ color: colors.text }}>
          {getLabel()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ThemeSelector;