import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DemoStepProps {
  number: string;
  title: string;
  description: string;
  textColor: string;
  accentColor: string;
}

const DemoStep: React.FC<DemoStepProps> = ({ 
  number, 
  title, 
  description, 
  textColor, 
  accentColor 
}) => (
  <View style={styles.demoStep}>
    <View style={[styles.stepNumber, { backgroundColor: accentColor }]}>
      <Text style={styles.stepNumberText}>{number}</Text>
    </View>
    <View style={styles.stepContent}>
      <Text style={[styles.stepTitle, { color: textColor }]}>{title}</Text>
      <Text style={[styles.stepDescription, { color: textColor + '99' }]}>
        {description}
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});

export default DemoStep;