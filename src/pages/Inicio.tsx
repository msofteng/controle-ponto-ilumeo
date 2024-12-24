import { Text, Title } from '@mantine/core';
import Card from '../shared/components/Card';
import TitlePage from '../shared/components/TitlePage';

export function Inicio() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Início</Title>

                    <Text mt='sm'>Bem-vindo(a) ao sistema de ponto da Ilumeo</Text>

                    <TitlePage content='Início &nbsp;|&nbsp; Ponto Ilumeo' />
                </div>
            }
        />
    );
}
