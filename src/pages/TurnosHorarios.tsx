import { Text, Title } from '@mantine/core';
import Card from '../shared/components/Card';

export function TurnosHorarios() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Turnos e Horários</Title>

                    <Text mt='sm'>Verifique os turnos e horários finalizados</Text>
                </div>
            }
        />
    );
}
