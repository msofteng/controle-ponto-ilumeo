import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';
import { useState } from 'react';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';

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
                </div>
            }
        />
    );
}
