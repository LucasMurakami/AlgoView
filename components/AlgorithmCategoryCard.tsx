import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export interface AlgorithmCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

interface AlgorithmCategoryCardProps {
  category: AlgorithmCategory;
  onPress: (id: string) => void;
  isDark: boolean;
  textColor: string;
}

const AlgorithmCategoryCard: React.FC<AlgorithmCategoryCardProps> = ({ 
  category, 
  onPress, 
  isDark, 
  textColor 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }
      ]}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={[`${category.color}40`, `${category.color}20`]}
        style={styles.categoryGradient}
        start={[0, 0]}
        end={[1, 1]}
      >
        <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
          <Ionicons name={category.icon} size={28} color="#FFFFFF" />
        </View>
        <Text style={[styles.categoryTitle, { color: textColor }]}>
          {category.title}
        </Text>
        <Text 
          style={[styles.categoryDescription, { color: isDark ? '#BBBBBB' : '#666666' }]}
          numberOfLines={2}
        >
          {category.description}
        </Text>
        <View style={styles.categoryFooter}>
          <Ionicons 
            name="arrow-forward-circle-outline" 
            size={20} 
            color={category.color} 
          />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: Math.min(width - 48, 320),
    height: 180,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 18,
    marginBottom: 8,
  },
  categoryDescription: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    flex: 1,
  },
  categoryFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 12,
  },
});

export default AlgorithmCategoryCard;