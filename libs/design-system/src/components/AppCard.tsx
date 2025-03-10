import { styled, Text, XStack, YStack } from 'tamagui';
import { Card } from './shared/Card';

export const AppCard = styled(Card, {
  name: 'AppCard',
  flexDirection: 'column',
  gap: 8,
  variants: {
    interactive: {
      true: {
        pressStyle: {
          opacity: 0.8,
          transform: 'scale(0.98)',
        },
        hoverStyle: {
          backgroundColor: '#F9FAFB',
        },
      },
    },
  },
});

export interface AppCardHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
}

export const AppCardHeader = ({
  title,
  subtitle,
  rightElement,
}: AppCardHeaderProps) => {
  return (
    <XStack justifyContent="space-between" alignItems="center" width="100%">
      <YStack>
        <Text fontWeight="bold" fontSize={18}>
          {title}
        </Text>
        {subtitle && (
          <Text fontSize={14} color="#374151">
            {subtitle}
          </Text>
        )}
      </YStack>
      {rightElement && <XStack>{rightElement}</XStack>}
    </XStack>
  );
};
