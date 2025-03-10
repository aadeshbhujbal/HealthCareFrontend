import { Button as TamaguiButton, styled } from 'tamagui';

/**
 * Enhanced Button component with consistent styling across platforms
 */
export const Button = styled(TamaguiButton, {
  // Base styles
  backgroundColor: '$primary',
  color: 'white',
  borderRadius: '$md',

  // Variants
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: 'white',
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
        color: '$color',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
      },
      danger: {
        backgroundColor: '$danger',
        color: 'white',
      },
      success: {
        backgroundColor: '$success',
        color: 'white',
      },
    },

    size: {
      xs: {
        paddingVertical: '$xs',
        paddingHorizontal: '$sm',
        fontSize: '$xs',
      },
      sm: {
        paddingVertical: '$sm',
        paddingHorizontal: '$md',
        fontSize: '$sm',
      },
      md: {
        paddingVertical: '$sm',
        paddingHorizontal: '$md',
        fontSize: '$md',
      },
      lg: {
        paddingVertical: '$md',
        paddingHorizontal: '$lg',
        fontSize: '$lg',
      },
      xl: {
        paddingVertical: '$md',
        paddingHorizontal: '$xl',
        fontSize: '$xl',
      },

      // For compatibility
      small: {
        paddingVertical: '$sm',
        paddingHorizontal: '$md',
        fontSize: '$sm',
      },
      medium: {
        paddingVertical: '$sm',
        paddingHorizontal: '$md',
        fontSize: '$md',
      },
      large: {
        paddingVertical: '$md',
        paddingHorizontal: '$lg',
        fontSize: '$lg',
      },
    },

    rounded: {
      true: {
        borderRadius: '$full',
      },
    },

    fullWidth: {
      true: {
        alignSelf: 'stretch',
      },
    },
  },

  // Default variants
});
