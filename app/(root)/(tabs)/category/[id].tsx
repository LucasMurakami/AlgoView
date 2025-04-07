import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { categoriesMap } from '@/constants/algorithms';

const CategoryScreen = () => {
  const { id } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  
  const bgColor = isDarkMode ? '#121212' : '#FFFFFF';
  const textColor = isDarkMode ? '#FFFFFF' : '#121212';
  const subTextColor = isDarkMode ? '#AAAAAA' : '#666666';
  const cardColor = isDarkMode ? '#1E1E1E' : '#F7F7F7';
  const cardShadowColor = isDarkMode ? '#000000' : '#CCCCCC';
  const accentColor = '#4F46E5';
  const accentGradientStart = '#4F46E5';
  const accentGradientEnd = '#7669FF';

  // Get category info from categoriesMap
  const categoryInfo = categoriesMap[id] || {
    title: 'Categoria Desconhecida',
    description: 'Esta categoria não foi encontrada.',
    icon: 'help-circle-outline',
    algorithms: [],
  };

  const navigateToAlgorithm = (algorithmId) => {
    router.push(`/category/${id}/${algorithmId}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          accessibilityLabel="Back to home"
        >
          <Ionicons name="arrow-back" size={24} color={textColor} />
        </TouchableOpacity>
        
        <Text style={[styles.headerTitle, { color: textColor }]}>
          {categoryInfo.title}
        </Text>
        
        <View style={{ width: 40 }} /> {/* Spacer for balanced header */}
      </View>
      
      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Icon */}
        <View style={styles.categoryIconContainer}>
          <LinearGradient
            colors={[accentGradientStart, accentGradientEnd]}
            style={styles.iconBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={categoryInfo.icon} size={32} color="#FFFFFF" />
          </LinearGradient>
        </View>
        
        {/* Description */}
        <Text style={[styles.description, { color: textColor }]}>
          {categoryInfo.description}
        </Text>
        
        {/* Algorithm List */}
        {categoryInfo.algorithms && categoryInfo.algorithms.length > 0 ? (
          <View style={styles.algorithmsList}>
            {categoryInfo.algorithms.map((algorithm, index) => (
              <TouchableOpacity
                key={algorithm.id}
                style={[
                  styles.algorithmCard,
                  { 
                    backgroundColor: cardColor,
                    shadowColor: cardShadowColor,
                  }
                ]}
                onPress={() => navigateToAlgorithm(algorithm.id)}
                activeOpacity={0.7}
                accessibilityLabel={`View ${algorithm.name} algorithm`}
              >
                <View style={styles.algorithmCardContent}>
                  <View style={styles.algorithmIconContainer}>
                    <Ionicons name={algorithm.icon} size={24} color={accentColor} />
                  </View>
                  
                  <View style={styles.algorithmTextContainer}>
                    <Text style={[styles.algorithmName, { color: textColor }]}>
                      {algorithm.name}
                    </Text>
                    <Text style={[styles.algorithmIndex, { color: subTextColor }]}>
                      {String(index + 1).padStart(2, '0')}
                    </Text>
                  </View>
                  
                  <View style={styles.chevronContainer}>
                    <Ionicons name="chevron-forward" size={20} color={accentColor} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="hourglass-outline" size={64} color={subTextColor} style={styles.emptyStateIcon} />
            <Text style={[styles.comingSoon, { color: subTextColor }]}>
              Os algoritmos desta categoria serão disponibilizados em breve!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    padding: 10,
    borderRadius: 20,
  },
  headerTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  categoryIconContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  iconBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  algorithmsList: {
    width: '100%',
  },
  algorithmCard: {
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  algorithmCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  algorithmIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    marginRight: 16,
  },
  algorithmTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  algorithmName: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
  algorithmIndex: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    opacity: 0.6,
    marginRight: 10,
  },
  chevronContainer: {
    paddingLeft: 8,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyStateIcon: {
    marginBottom: 16,
  },
  comingSoon: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CategoryScreen;