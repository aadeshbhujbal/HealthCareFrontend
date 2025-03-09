import { styled, Input as TamaguiInput } from 'tamagui';

export const Input = styled(TamaguiInput, {
  name: 'Input',
  borderWidth: 1,
  borderColor: '$gray300',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 12,
  fontSize: 16,
  backgroundColor: 'white',
  outlineWidth: 0,
  variants: {
    state: {
      error: {
        borderColor: '$red',
      },
      success: {
        borderColor: '$green',
      },
    },
    size: {
      small: {
        paddingVertical: 6,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      medium: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontSize: 16,
      },
      large: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 18,
      },
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});
