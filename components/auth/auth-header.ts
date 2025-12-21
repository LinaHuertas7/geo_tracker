import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const createAuthHeaderStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    header: {
      marginBottom: 24,
      alignItems: 'center',
    },

    title: {
      fontSize: 28,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 8,
    },

    subtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};
