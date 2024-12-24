import { Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { converterMarcacoesEmGrafico } from '../shared/functions/chart-convert';
import { GraficoData, Usuario } from '../shared/models/interfaces/controle-ponto.entities';

import Chart from 'react-apexcharts';
import Card from '../shared/components/Card';
import service from '../shared/services/service';
import TitlePage from '../shared/components/TitlePage';

export function AnalisePonto(props: { user?: Usuario }) {
    const [resultados, setResultados] = useState<GraficoData>({ categories: [], series: [] });

    useEffect(() => {
        service.getAllMarks(Number(props.user?.id)).then((marcacoes) => setResultados(converterMarcacoesEmGrafico(marcacoes)));
    }, [props.user?.id]);

    return (
        <Card
            content={
                <div>
                    <Title order={3}>Análise de Ponto</Title>

                    <Text mt='sm' mb='xl'>
                        Veja os gráficos de suas horas trabalhadas, incluindo jornadas cumpridas, horas finalizadas, atrasos e remuneração.
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

                    <TitlePage content='Análise de Ponto &nbsp;|&nbsp; Ponto Ilumeo' />
                </div>
            }
        />
    );
}
