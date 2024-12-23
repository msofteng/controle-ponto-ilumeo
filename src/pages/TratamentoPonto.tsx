import { BarChart } from '@mantine/charts';
import { Text, Title } from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { converterMarcacoesEmGraficoDiario } from '../shared/functions/chart-convert';
import { GraficoDiario, Marcacao, Usuario } from '../shared/models/interfaces/controle-ponto.entities';

import Card from '../shared/components/Card';
import service from '../shared/services/service';

import 'dayjs/locale/pt';

export function TratamentoPonto(props: { user?: Usuario }) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    const [resultados, setResultados] = useState<GraficoDiario>({ data: [], series: [] });
    const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);

    useEffect(() => {
        service.getAllMarks(Number(props.user?.id)).then((marcacoes) => {
            setResultados(converterMarcacoesEmGraficoDiario(marcacoes));
            setMarcacoes(marcacoes);
        });
    }, [props.user?.id]);

    const filtrarMarcacoesPorData = (marcacoes: Marcacao[], dataInicio: Date | null, dataFim: Date | null) => {
        if (dataInicio) {
            dataInicio.setHours(0, 0, 0, 0);
        }
        if (dataFim) {
            dataFim.setHours(23, 59, 59, 999);
        }

        return marcacoes.filter((marcacao) => {
            const dataTermino = marcacao.termino ? new Date(marcacao.termino) : null;
            const dataInicioMarcacao = new Date(marcacao.inicio);

            const estaDentroDoIntervalo =
                ((dataInicio ? dataInicioMarcacao >= dataInicio : true) &&
                    (dataFim ? dataTermino && dataTermino <= dataFim : true)) ||
                (dataInicio && dataFim
                    ? dataInicioMarcacao <= dataFim && (dataTermino ? dataTermino >= dataInicio : true)
                    : true);

            return estaDentroDoIntervalo;
        });
    };

    const updateDatePicker = (value: DatesRangeValue) => {
        setValue(value);

        const [dataInicio, dataFim] = value;

        const marcacoesFiltradas = filtrarMarcacoesPorData(marcacoes, dataInicio, dataFim);
        const graficoData = converterMarcacoesEmGraficoDiario(marcacoesFiltradas);

        setResultados(graficoData);
    };

    return (
        <Card
            content={
                <div>
                    <Title order={3}>Tratamento de Ponto</Title>

                    <Text mt='sm'>Visualize as suas horas trabalhadas</Text>

                    <DatePickerInput
                        valueFormat='DD/MM/YYYY'
                        locale='pt'
                        mt={'sm'}
                        type='range'
                        label='Intervalo (Período)'
                        description='Selecione um intervalo para visualizar as horas trabalhadas'
                        placeholder='Selecione um período'
                        value={value}
                        onChange={updateDatePicker}
                        leftSectionWidth={40}
                        leftSection={
                            <IconCalendarEvent style={{ width: 20, height: 20, color: 'var(--color-subtitle)' }} />
                        }
                    />

                    <BarChart
                        mt={'xl'}
                        h={350}
                        data={resultados.data}
                        dataKey='dia'
                        withLegend
                        legendProps={{ style: { border: '2px solid red' } }}
                        type='stacked'
                        yAxisLabel='Horas Trabalhadas'
                        series={resultados.series}
                        referenceLines={[
                            {
                                y: 8,
                                color: 'red.7',
                                label: 'Jornada de Trabalho (8hrs/dia)',
                                labelPosition: 'insideBottomLeft',
                            },
                        ]}
                    />
                </div>
            }
        />
    );
}
