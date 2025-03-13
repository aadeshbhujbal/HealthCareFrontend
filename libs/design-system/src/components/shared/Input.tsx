import { Input as TamaguiInput, styled, GetProps } from 'tamagui';

export type InputProps = GetProps<typeof TamaguiInput>;

/**
 * Enhanced Input component with consistent styling across platforms
 */
export const Input = styled(TamaguiInput, {
  // Base styles
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$md',
  padding: '$sm',
  fontSize: '$md',
  color: '$text',
  outlineWidth: 0,

  // Modern properties instead of deprecated ones
  inputMode: 'text',
  readOnly: false,
  rows: 1,

  // Variants
  variants: {
    variant: {
      default: {
        borderColor: '$borderColor',
      },
      filled: {
        backgroundColor: '$backgroundHover',
        borderColor: 'transparent',
      },
      outline: {
        backgroundColor: 'transparent',
      },
      unstyled: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 0,
      },
    },

    state: {
      default: {
        borderColor: '$borderColor',
      },
      error: {
        borderColor: '$danger',
      },
      success: {
        borderColor: '$success',
      },
      disabled: {
        opacity: 0.6,
        pointerEvents: 'none',
      },
    },

    size: {
      sm: {
        padding: '$xs',
        fontSize: '$sm',
        borderRadius: '$sm',
      },
      md: {
        padding: '$sm',
        fontSize: '$md',
        borderRadius: '$md',
      },
      lg: {
        padding: '$md',
        fontSize: '$lg',
        borderRadius: '$md',
      },

      // For compatibility
      small: {
        padding: '$xs',
        fontSize: '$sm',
        borderRadius: '$sm',
      },
      medium: {
        padding: '$sm',
        fontSize: '$md',
        borderRadius: '$md',
      },
      large: {
        padding: '$md',
        fontSize: '$lg',
        borderRadius: '$md',
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
    },
  },
}) as typeof TamaguiInput;
