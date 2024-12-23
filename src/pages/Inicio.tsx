import { Text, Title } from '@mantine/core';
import Card from '../shared/components/Card';

export function Inicio() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Início</Title>

                    <Text mt='sm'>Bem-vindo(a) ao sistema de ponto da Ilumeo</Text>
                </div>
            }
        />
    );
}
