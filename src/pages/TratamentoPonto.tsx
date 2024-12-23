import { BarChart } from '@mantine/charts';
import { Text, Title } from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import { useState } from 'react';

import Card from '../shared/components/Card';

import 'dayjs/locale/pt';

export function TratamentoPonto() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

    const updateDatePicker = (value: DatesRangeValue) => {
        setValue(value);
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
                        data={[
                            { dia: '01/01', Trabalhadas: 8, Ausentes: 0 },
                            { dia: '02/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '03/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '04/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '05/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '06/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '07/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '08/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '09/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '10/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '11/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '12/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '13/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '14/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '15/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '16/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '17/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '18/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '19/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '20/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '21/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '22/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '23/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '24/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '25/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '26/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '27/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '28/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '29/01', Trabalhadas: 5, Ausentes: 3 },
                            { dia: '30/01', Trabalhadas: 8, Ausentes: 2.5 },
                        ]}
                        dataKey='dia'
                        withLegend
                        legendProps={{ style: { border: '2px solid red' } }}
                        type='stacked'
                        yAxisLabel='Horas Trabalhadas'
                        series={[
                            { name: 'Trabalhadas', color: 'var(--bg-color-default)' },
                            { name: 'Ausentes', color: 'var(--color-ilumeo)' },
                        ]}
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
