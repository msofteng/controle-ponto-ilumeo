import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';

export function AnalisePonto() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Análise de Ponto</Title>

                    <Text mt='sm'>
                        Veja os gráficos de suas horas trabalhadas, incluindo jornadas cumpridas, horas finalizadas,
                        atrasos e remuneração.
                    </Text>
                </div>
            }
        />
    );
}
