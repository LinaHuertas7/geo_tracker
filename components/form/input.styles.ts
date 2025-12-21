import { Colors } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const InputStyles = (colorScheme: 'light' | 'dark') => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    container: {
      marginBottom: 16,
    },

    label: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },

    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 48,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.background,
      transitionDuration: 'all 0.2s ease',
    },

    inputWrapperFocused: {
      borderColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    inputWrapperError: {
      borderColor: '#F44336',
    },

    input: {
      flex: 1,
      fontSize: 14,
      color: colors.text,
      padding: 0,
    },

    passwordToggle: {
      padding: 8,
      marginRight: -8,
    },

    errorText: {
      fontSize: 12,
      color: '#F44336',
      marginTop: 6,
      fontWeight: '500',
    },
  });
};
