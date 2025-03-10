import { Text as TamaguiText, styled } from 'tamagui';

/**
 * Enhanced Text component with consistent styling across platforms
 */
export const Text = styled(TamaguiText, {
  // Base styles
  color: '$text',
  fontFamily: '$body',

  // Variants
  variants: {
    variant: {
      default: {
        color: '$text',
      },
      heading: {
        fontFamily: '$heading',
        fontWeight: 'bold',
        color: '$text',
      },
      subheading: {
        fontFamily: '$heading',
        fontWeight: '600',
        color: '$textLight',
      },
      body: {
        fontFamily: '$body',
        color: '$text',
      },
      label: {
        fontFamily: '$body',
        fontWeight: '500',
        color: '$textLight',
      },
      caption: {
        fontFamily: '$body',
        fontSize: '$xs',
        color: '$textMuted',
      },
      error: {
        color: '$danger',
      },
      success: {
        color: '$success',
      },
      warning: {
        color: '$warning',
      },
      info: {
        color: '$primary',
      },
    },

    size: {
      xs: {
        fontSize: '$xs',
      },
      sm: {
        fontSize: '$sm',
      },
      md: {
        fontSize: '$md',
      },
      lg: {
        fontSize: '$lg',
      },
      xl: {
        fontSize: '$xl',
      },
      '2xl': {
        fontSize: '$2xl',
      },
    },

    weight: {
      normal: {
        fontWeight: 'normal',
      },
      medium: {
        fontWeight: '500',
      },
      semibold: {
        fontWeight: '600',
      },
      bold: {
        fontWeight: 'bold',
      },
    },

    align: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
      right: {
        textAlign: 'right',
      },
      justify: {
        textAlign: 'justify',
      },
    },
  },
});
