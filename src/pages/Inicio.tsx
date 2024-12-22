import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';

export function Inicio() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>You&apos;ve won a million dollars in cash!</Title>

                    <Text mt='sm'>
                        Please click anywhere on this card to claim your reward, this is not a fraud, trust us
                    </Text>
                </div>
            }
        />
    );
}
