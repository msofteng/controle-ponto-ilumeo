import { Title, Text } from '@mantine/core';
import Card from '../shared/components/Card';

export function Conta() {
    return (
        <Card
            content={
                <div>
                    <Title order={3}>Minha Conta</Title>

                    <Text mt='sm'>Visualize ou edite as suas informações pessoais</Text>
                </div>
            }
        />
    );
}
