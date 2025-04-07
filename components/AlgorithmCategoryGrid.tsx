import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlgorithmCategoryCard, { AlgorithmCategory } from './AlgorithmCategoryCard';

interface AlgorithmCategoryGridProps {
  categories: AlgorithmCategory[];
  onSelectCategory: (id: string) => void;
  isDark: boolean;
  textColor: string;
  showTitle?: boolean;
  title?: string;
  subtitle?: string;
}

const AlgorithmCategoryGrid: React.FC<AlgorithmCategoryGridProps> = ({
  categories,
  onSelectCategory,
  isDark,
  textColor,
  showTitle = true,
  title = "Explore os Algoritmos",
  subtitle = "Navegue por nossa coleção organizada de algoritmos por categoria"
}) => {
  return (
    <View style={styles.categoriesSection}>
      {showTitle && (
        <>
          <Text style={[styles.sectionTitle, { color: textColor }]}>
            {title}
          </Text>
          <Text style={[styles.categorySubtitle, { color: isDark ? '#AAAAAA' : '#666666' }]}>
            {subtitle}
          </Text>
        </>
      )}
      
      <View style={styles.bookshelf}>
        {categories.map((category) => (
          <AlgorithmCategoryCard
            key={category.id}
            category={category}
            onPress={onSelectCategory}
            isDark={isDark}
            textColor={textColor}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  categorySubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 700,
    alignSelf: 'center',
  },
  bookshelf: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
});

export default AlgorithmCategoryGrid;