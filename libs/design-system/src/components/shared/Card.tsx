import { Card as TamaguiCard, styled } from 'tamagui';

/**
 * Enhanced Card component with consistent styling across platforms
 */
export const Card = styled(TamaguiCard, {
  // Base styles
  backgroundColor: 'white',
  borderRadius: '$md',
  padding: '$md',

  // Variants
  variants: {
    variant: {
      elevated: {
        shadowColor: '$shadowColor',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$backgroundHover',
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    },

    size: {
      sm: {
        padding: '$sm',
      },
      md: {
        padding: '$md',
      },
      lg: {
        padding: '$lg',
      },
      xl: {
        padding: '$xl',
      },

      // For compatibility
      small: {
        padding: '$sm',
      },
      medium: {
        padding: '$md',
      },
      large: {
        padding: '$lg',
      },
    },

    rounded: {
      sm: {
        borderRadius: '$sm',
      },
      md: {
        borderRadius: '$md',
      },
      lg: {
        borderRadius: '$lg',
      },
      xl: {
        borderRadius: '$xl',
      },
      none: {
        borderRadius: 0,
      },
    },
  },
});
