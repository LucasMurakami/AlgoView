import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  bgColor, 
  textColor 
}) => (
  <View style={[styles.featureCard, { backgroundColor: bgColor }]}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={32} color="#4F46E5" />
    </View>
    <Text style={[styles.featureTitle, { color: textColor }]}>{title}</Text>
    <Text style={[styles.featureDescription, { color: textColor + '99' }]}>
      {description}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  featureCard: {
    width: Math.min(width - 48, 270),
    marginHorizontal: 12,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  featureDescription: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    lineHeight: 22,
  },
});

export default FeatureCard;