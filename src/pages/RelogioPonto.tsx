import { Button, Pagination, Textarea, Title } from '@mantine/core';
import Card from '../shared/components/Card';
import { DonutChart } from '@mantine/charts';
import { Group, Paper, Progress, Text } from '@mantine/core';

export function RelogioPonto() {
    return (
        <Card
            cardProps={{ id: 'card-turno' }}
            content={
                <>
                    <div className='marcacao-ponto'>
                        <Title order={3}>Relógio de ponto</Title>

                        <Title mt={'md'} order={2}>
                            6h 13m &nbsp;&nbsp; -01:12:05
                        </Title>
                        <Title order={6}>Horas de Hoje &nbsp;&nbsp;&nbsp; Tempo Restante</Title>

                        <Textarea
                            mt={'md'}
                            label='Observação'
                            description='Adicione uma observação ou justificativa'
                            placeholder='Ex.: Exame Médico as 16:00, Entrando mais tarde, ...'
                            autosize
                            className='obs-turno'
                        />

                        <Button mt='md' variant='filled'>
                            FINALIZAR TURNO
                        </Button>

                        {Array.from({ length: 5 }).map((_, index: number) => (
                            <Paper key={index} radius='md' withBorder className='card-detail' mt={20}>
                                <Text ta='left' fw={700} className='title'>
                                    10 de dezembro de 2024
                                </Text>
                                <Text c='dimmed' ta='left' fz='sm'>
                                    7h 30m / 8h
                                </Text>

                                <Group justify='space-between' mt='xs'>
                                    <Text fz='sm' c='dimmed'>
                                        Progresso
                                    </Text>
                                    <Text fz='sm' c='dimmed'>
                                        90%
                                    </Text>
                                </Group>

                                <Progress value={90} mt={5} />

                                <Group justify='space-between' mt='md'>
                                    <Text fz='sm'>
                                        <strong>Observação: </strong>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt autem saepe sit
                                        aut aliquam. Ducimus praesentium accusantium tempore assumenda cupiditate hic.
                                        Quo eveniet rerum earum libero voluptatum accusantium sed asperiores.
                                    </Text>
                                </Group>
                            </Paper>
                        ))}

                        <Pagination radius={'md'} total={5} />
                    </div>
                    <div className='grafico-ponto'>
                        <DonutChart
                            data={[
                                { name: 'Tempo Trabalhado', value: 7, color: 'rgba(var(--bg-color-default-rgb), 0.9)' },
                                { name: 'Tempo Restante', value: 1, color: 'var(--bg-color-primary)' },
                            ]}
                            strokeWidth={0}
                            thickness={50}
                            size={400}
                        />
                    </div>
                </>
            }
        />
    );
}
