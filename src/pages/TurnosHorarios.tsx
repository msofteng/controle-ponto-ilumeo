import { Text, Title } from '@mantine/core';
import Card from '../shared/components/Card';
import TitlePage from '../shared/components/TitlePage';

export function TurnosHorarios() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Turnos e Horários</Title>

                    <Text mt='sm'>Verifique os turnos e horários finalizados</Text>

                    <TitlePage content='Turnos e Horários &nbsp;|&nbsp; Ponto Ilumeo' />
                </div>
            }
        />
    );
}
