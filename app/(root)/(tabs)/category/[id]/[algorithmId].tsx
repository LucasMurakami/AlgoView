import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';

const AlgorithmScreen = () => {
  const { id, algorithmId } = useLocalSearchParams();
  const { isDarkMode } = useTheme();
  const isDark = isDarkMode;
  
  const bgColor = isDark ? '#121212' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5';
  
  // Function to get algorithm name - this would typically come from your data source
  const getAlgorithmName = () => {
    // This is a simplified implementation - you would replace with real data
    const algorithmsMap = {
      'bubble-sort': 'Bubble Sort',
      'quick-sort': 'Quick Sort',
      'merge-sort': 'Merge Sort',
      'insertion-sort': 'Insertion Sort',
      'selection-sort': 'Selection Sort',
      'binary-search': 'Binary Search',
      'linear-search': 'Linear Search',
      'depth-first-search': 'Depth First Search',
      'breadth-first-search': 'Breadth First Search',
      'dijkstra': 'Algoritmo de Dijkstra',
      'kruskal': 'Algoritmo de Kruskal',
      'ford-fulkerson': 'Ford-Fulkerson',
      'kmp': 'Knuth-Morris-Pratt',
      'rabin-karp': 'Rabin-Karp',
      'euclidean': 'Algoritmo de Euclides',
      'sieve': 'Crivo de Eratóstenes',
      'huffman': 'Codificação de Huffman',
      'rsa': 'RSA',
      'aes': 'AES',
      'k-means': 'K-Means',
      'knn': 'K-Nearest Neighbors',
    };
    
    return algorithmsMap[algorithmId] || 'Unknown Algorithm';
  };
  
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      
      <View style={styles.content}>
        <Text style={[styles.algorithmDescription, { color: textColor }]}>
          {getAlgorithmName()}
        </Text>
        
        <Text style={[styles.comingSoon, { color: isDark ? '#AAAAAA' : '#666666' }]}>
          Visualização detalhada em breve!
        </Text>
        
        <TouchableOpacity
          style={[styles.backButtonLarge, { backgroundColor: accentColor }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar para a Categoria</Text>
        </TouchableOpacity>
      </View>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40, // Same width as back button for alignment
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  algorithmDescription: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  comingSoon: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  backButtonLarge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

export default AlgorithmScreen;