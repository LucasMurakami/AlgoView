import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { FeatureCard, DemoStep, AlgorithmCategoryGrid, Header } from '@/components';
import { algorithmCategories } from '@/constants/algorithmCategories';

const { width } = Dimensions.get('window');

const LandingPage = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const isDark = isDarkMode;
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const bgColor = isDark ? '#121212' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#121212';
  const accentColor = '#4F46E5'; 
  const secondaryColor = isDark ? '#2D2D2D' : '#F3F4F6';

  const goToApp = () => {
    router.push('/dashboard');
  };

  const goToCategory = (category) => {
    router.push(`/category/${category}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Header 
          showDonateButton={true}
          onThemeToggle={toggleTheme}
          isDark={isDark}
          textColor={textColor}
          accentColor={accentColor}
          isFixed={false}
        />

      <ScrollView contentContainerStyle={styles.scrollContent}>        
        
        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection, 
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={[styles.heroTitle, { color: textColor }]}>
            Visualize Algoritmos de Forma Interativa
          </Text>
          <Text style={[styles.heroSubtitle, { color: isDark ? '#AAAAAA' : '#666666' }]}>
            Aprenda algoritmos passo a passo com animações intuitivas geradas por IA
          </Text>
          
          <TouchableOpacity 
            style={[styles.ctaButton, { backgroundColor: accentColor }]} 
            onPress={goToApp}
          >
            <Text style={styles.ctaButtonText}>Começar agora</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Recursos</Text>
          
          <View style={styles.featureGrid}>
            <FeatureCard 
              icon="code-outline" 
              title="Visualização Interativa" 
              description="Veja algoritmos em ação com animações detalhadas e interativas"
              bgColor={secondaryColor}
              textColor={textColor}
            />
            <FeatureCard 
              icon="school-outline" 
              title="Aprendizado Passo a Passo" 
              description="Entenda cada etapa do algoritmo com explicações claras"
              bgColor={secondaryColor}
              textColor={textColor}
            />
            <FeatureCard 
              icon="bulb-outline" 
              title="Gerado por IA" 
              description="Visualizações precisas criadas com tecnologia de IA avançada"
              bgColor={secondaryColor}
              textColor={textColor}
            />
            <FeatureCard 
              icon="brush-outline" 
              title="Design Minimalista" 
              description="Interface limpa e intuitiva para focar no aprendizado"
              bgColor={secondaryColor}
              textColor={textColor}
            />
          </View>
        </View>
        
        {/* Algorithm Categories Section (Bookshelf) */}
        <View style={styles.categoriesSection}>
                    
          <AlgorithmCategoryGrid
            categories={algorithmCategories}
            onSelectCategory={goToCategory}
            isDark={isDark}
            textColor={textColor}
          />
        </View>

        {/* Demo Section */}
        <View style={styles.demoSection}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Como funciona</Text>
          
          <View style={[styles.demoCard, { backgroundColor: secondaryColor }]}>
            <View style={styles.demoSteps}>
              <DemoStep 
                number="1" 
                title="Escolha um algoritmo" 
                description="Selecione entre dezenas de algoritmos de diferentes categorias"
                textColor={textColor}
                accentColor={accentColor}
              />
              <DemoStep 
                number="2" 
                title="Visualize a execução" 
                description="Observe o algoritmo em ação com animações interativas"
                textColor={textColor}
                accentColor={accentColor}
              />
              <DemoStep 
                number="3" 
                title="Aprenda os conceitos" 
                description="Entenda os princípios e a lógica por trás de cada algoritmo"
                textColor={textColor}
                accentColor={accentColor}
              />
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <LinearGradient
          colors={isDark ? ['#2D2F8A', '#4F46E5'] : ['#E0E7FF', '#C7D2FE']}
          style={styles.ctaSection}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Text style={[styles.ctaTitle, { color: isDark ? '#FFFFFF' : '#4338CA' }]}>
            Pronto para explorar algoritmos de uma nova maneira?
          </Text>
          <TouchableOpacity 
            style={[styles.ctaButtonLarge, { backgroundColor: isDark ? '#FFFFFF' : '#4F46E5' }]} 
            onPress={goToApp}
          >
            <Text style={[styles.ctaButtonLargeText, { color: isDark ? '#4F46E5' : '#FFFFFF' }]}>
              Começar a jornada
            </Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: isDark ? '#999999' : '#666666' }]}>
            © 2025 AlgoView. Todos os direitos reservados.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 80,
    alignItems: 'center',
  },
  heroTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
    maxWidth: 600,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 20,
  },
  ctaButtonText: {
    fontFamily: 'Rubik-Medium',
    color: '#FFFFFF',
    fontSize: 16,
    marginRight: 8,
  },
  featuresSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  sectionTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: -12,
  },

  categoriesSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
    backgroundColor: 'transparent',
  },
  categorySubtitle: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 700,
    alignSelf: 'center',
  },
  demoSection: {
    paddingHorizontal: 24,
    paddingVertical: 60,
  },
  demoCard: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  demoSteps: {
    width: '100%',
    maxWidth: 600,
  },
  demoStep: {
    flexDirection: 'row',
    marginBottom: 28,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontFamily: 'Rubik-Bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    marginBottom: 8,
  },
  stepDescription: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
  ctaSection: {
    marginHorizontal: 24,
    marginVertical: 40,
    padding: 40,
    borderRadius: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontFamily: 'Rubik-Bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 32,
    maxWidth: 600,
  },
  ctaButtonLarge: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
  },
  ctaButtonLargeText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 16,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
  },
});

export default LandingPage;