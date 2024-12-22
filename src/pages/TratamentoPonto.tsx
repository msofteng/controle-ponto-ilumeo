import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';

export function TratamentoPonto() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Tratamento de Ponto</Title>

                    <Text mt='sm'>Visualize as suas horas trabalhadas</Text>
                </div>
            }
        />
    );
}
