import { styled, YStack } from 'tamagui';

export const Card = styled(YStack, {
  name: 'Card',
  backgroundColor: 'white',
  borderRadius: 12,
  padding: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 2,
  variants: {
    type: {
      elevated: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 4,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$gray300',
        shadowOpacity: 0,
        elevation: 0,
      },
      flat: {
        shadowOpacity: 0,
        elevation: 0,
      },
    },
    size: {
      small: {
        padding: 12,
      },
      medium: {
        padding: 16,
      },
      large: {
        padding: 24,
      },
    },
  },
  defaultVariants: {
    type: 'elevated',
    size: 'medium',
  },
});
