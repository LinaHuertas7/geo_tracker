import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const createButtonStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    buttonPrimary: {
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },

    buttonSecondary: {
      height: 48,
      borderRadius: 12,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonPressed: {
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    },

    buttonDisabled: {
      opacity: 0.5,
    },

    buttonTextPrimary: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
    },

    buttonTextSecondary: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.primary,
    },
  });
};
