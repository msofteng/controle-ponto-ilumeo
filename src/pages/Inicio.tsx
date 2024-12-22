import { Title } from '@mantine/core';
import { Card, Text } from '@mantine/core';

export function Inicio() {
    return (
        <Card className='shadow-card'>
            <Title order={3}>You&apos;ve won a million dollars in cash!</Title>

            <Text mt='sm'>Please click anywhere on this card to claim your reward, this is not a fraud, trust us</Text>
        </Card>
    );
}
