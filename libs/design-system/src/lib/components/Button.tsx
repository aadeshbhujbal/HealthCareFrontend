import { styled, Button as TamaguiButton } from 'tamagui';

export const Button = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$primary',
  borderRadius: 8,
  paddingVertical: 12,
  paddingHorizontal: 16,
  color: 'white',
  fontWeight: 'bold',
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
      danger: {
        backgroundColor: '$red',
        color: 'white',
      },
    },
    size: {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 14,
      },
      medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
      },
      large: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        fontSize: 18,
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
