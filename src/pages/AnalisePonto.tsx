import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';
import Chart from 'react-apexcharts';

export function AnalisePonto() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Análise de Ponto</Title>

                    <Text mt='sm' mb='xl'>
                        Veja os gráficos de suas horas trabalhadas, incluindo jornadas cumpridas, horas finalizadas,
                        atrasos e remuneração.
                    </Text>

                    <Chart
                        options={{
                            chart: {
                                type: 'area',
                                height: 350,
                                fontFamily: 'Epilogue',
                            },
                            dataLabels: {
                                enabled: true,
                            },
                            stroke: {
                                curve: 'smooth',
                            },
                            xaxis: {
                                type: 'category',
                                categories: [
                                    'Junho/2024',
                                    'Julho/2024',
                                    'Agosto/2024',
                                    'Setembro/2024',
                                    'Outubro/2024',
                                    'Novembro/2024',
                                    'Dezembro/2024',
                                ],
                            },
                            title: {
                                text: 'Horas Trabalhadas (por mês)',
                            },
                            yaxis: {
                                title: {
                                    text: 'Horas Trabalhadas',
                                },
                            },
                        }}
                        series={[
                            {
                                name: 'Horas Trabalhadas',
                                data: [31, 40, 28, 51, 42, 109, 50],
                                color: 'var(--bg-color-default)',
                            },
                            {
                                name: 'Horas Ausentes',
                                data: [11, 32, 45, 32, 34, 52, 60],
                                color: 'var(--bg-color-primary)',
                            },
                        ]}
                        type='area'
                        height={350}
                    />
                </div>
            }
        />
    );
}
