import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar as RNStatusBar } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showThemeToggle?: boolean;
  showDonateButton?: boolean;
  onThemeToggle?: () => void;
  isDark?: boolean;
  textColor?: string;
  accentColor?: string;
  position?: 'absolute' | 'relative';
  isFixed?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showThemeToggle = true,
  showDonateButton = false,
  onThemeToggle,
  isDark = false,
  textColor = '#000000',
  accentColor = '#4F46E5',
  position = 'relative',
  isFixed = false
}) => {
  const insets = useSafeAreaInsets();
  
  // Importante: usar valores consistentes para iOS e Android
  const statusBarHeight = RNStatusBar.currentHeight || 0;
  const topPadding = Platform.OS === 'ios' ? insets.top : statusBarHeight;
  
  return (
    <View 
      style={[
        styles.headerContainer, 
        { 
          position: isFixed ? 'fixed' : position,
          top: 0,
          left: 0,
          right: 0,
          paddingTop: topPadding,
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
          zIndex: 1000,
          elevation: isFixed ? 5 : 0, 
          shadowColor: isFixed ? '#000000' : 'transparent',
          shadowOffset: { width: 0, height: isFixed ? 2 : 0 },
          shadowOpacity: isFixed ? 0.1 : 0,
          shadowRadius: isFixed ? 3 : 0,
          borderBottomWidth: 1,
          borderBottomColor: isDark ? '#2D2D2D' : '#F3F4F6',
        }
      ]}
    >
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="arrow-back" size={24} color={textColor} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.logoContainer, 
            { 
              flex: showBackButton ? 1 : undefined,
              marginLeft: showBackButton ? 0 : 8
            }
          ]}
          onPress={() => router.push('/')}
          accessibilityLabel="Ir para a página inicial"
        >
          {title ? (
            <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
              {title}
            </Text>
          ) : (
            <Text style={[styles.logo, { color: textColor }]}>
              Algo<Text style={{ color: accentColor }}>View</Text>
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.headerActions}>
          {showThemeToggle && (
            <TouchableOpacity
              style={styles.themeToggle}
              onPress={onThemeToggle}
              accessibilityLabel="Alternar tema claro/escuro"
            >
              <Ionicons
                name={isDark ? 'sunny-outline' : 'moon-outline'}
                size={22}
                color={textColor}
              />
            </TouchableOpacity>
          )}

          {showDonateButton && (
            <TouchableOpacity 
              style={styles.donateButton} 
              onPress={() => router.push('/donate')}
            >
              <Text style={[styles.donateButtonText, { color: accentColor }]}>
                Buy me a Coffee!
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    left: 0,
    right: 0,
    top: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  logoContainer: {
    minWidth: 100,
    paddingHorizontal: 8,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: 'Rubik-Bold',
    fontSize: 24,
  },
  title: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 8,
    marginRight: 16,
    borderRadius: 20,
  },
  donateButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  donateButtonText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 14,
  },
});

export default Header;