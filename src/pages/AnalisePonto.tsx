import { Text, Title } from '@mantine/core';

import Chart from 'react-apexcharts';
import Card from '../shared/components/Card';
import { useEffect, useState } from 'react';
import { GraficoData, Usuario } from '../shared/models/interfaces/controle-ponto.entities';
import service from '../shared/services/service';
import { converterMarcacoesEmGrafico } from '../shared/functions/chart-convert';

export function AnalisePonto(props: { user?: Usuario }) {
    const [resultados, setResultados] = useState<GraficoData>({ categories: [], series: [] });

    useEffect(() => {
        service.getAllMarks(props.user!.id).then((marcacoes) => setResultados(converterMarcacoesEmGrafico(marcacoes)));
    }, []);

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
                                categories: resultados.categories,
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
                        series={resultados.series}
                        type='area'
                        height={350}
                    />
                </div>
            }
        />
    );
}
