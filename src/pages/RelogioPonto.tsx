import { DonutChart } from '@mantine/charts';
import { Button, Group, Pagination, Paper, Progress, Text, Textarea, Title } from '@mantine/core';
import { Marcacao, Usuario } from '../shared/models/interfaces/controle-ponto.entities';
import { useEffect, useState } from 'react';

import Card from '../shared/components/Card';
import service from '../shared/services/service';

export function RelogioPonto(props: { user?: Usuario }) {
    const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);

    useEffect(() => {
        service.getAllMarks(Number(props.user?.id)).then((marcacoes) => setMarcacoes(marcacoes.reverse()));
    }, []);

    // Função para calcular as horas trabalhadas, descontando a hora de almoço
    const calcularHorasTrabalhadas = (
        dataInicio: Date,
        dataTermino: Date | null
    ): { horasTrabalhadas: number; horasAusentes: number } => {
        if (!dataTermino) return { horasTrabalhadas: 0, horasAusentes: 8 }; // Caso não tenha termino, considera como ausente.

        // Calculando as horas totais
        const horasTrabalhadas = (dataTermino.getTime() - dataInicio.getTime()) / (1000 * 60 * 60); // horas totais trabalhadas

        // Verificar intervalo de almoço (das 12h00 às 13h00)
        const horaAlmocoInicio = new Date(dataInicio);
        horaAlmocoInicio.setHours(12, 0, 0, 0);
        const horaAlmocoFim = new Date(dataInicio);
        horaAlmocoFim.setHours(13, 0, 0, 0);

        let horasAlmoco = 0;
        if (dataInicio < horaAlmocoFim && dataTermino > horaAlmocoInicio) {
            horasAlmoco = 1; // Se o intervalo de almoço estiver dentro do horário de trabalho
        }

        const horasTrabalhadasCorrigidas = Math.max(0, horasTrabalhadas - horasAlmoco); // Desconta a hora de almoço, mas garante que não fique negativo.

        // Calcular horas ausentes (se menos de 8 horas trabalhadas)
        const horasAusentes = Math.max(0, 8 - horasTrabalhadasCorrigidas);

        return { horasTrabalhadas: horasTrabalhadasCorrigidas, horasAusentes };
    };

    // Função para calcular a jornada adicional
    const calcularJornadaAdicional = (horasTrabalhadas: number) => {
        const jornadaBase = 8; // jornada de 8 horas
        if (horasTrabalhadas > jornadaBase) {
            const horasAdicionais = horasTrabalhadas - jornadaBase;
            const horas = Math.floor(horasAdicionais);
            const minutos = Math.round((horasAdicionais - horas) * 60);
            return `${horas}h ${minutos}m`;
        }
        return null;
    };

    // Função para calcular o progresso (percentual de horas trabalhadas)
    const calcularProgresso = (horasTrabalhadas: number) => {
        const jornadaBase = 8;
        const progresso = Math.min((horasTrabalhadas / jornadaBase) * 100, 100);
        return progresso;
    };

    // Função para formatar a data como "10 de dezembro de 2024"
    const formatarDataPorExtenso = (data: Date) => {
        const opcoes: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('pt-BR', opcoes).format(data);
    };

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

                        {marcacoes.map((marcacao) => {
                            const dataInicio = new Date(marcacao.inicio);
                            const dataTermino = marcacao.termino ? new Date(marcacao.termino) : null;
                            const { horasTrabalhadas } = calcularHorasTrabalhadas(dataInicio, dataTermino);
                            const jornadaAdicional = calcularJornadaAdicional(horasTrabalhadas);
                            const progresso = calcularProgresso(horasTrabalhadas);

                            return (
                                <Paper key={marcacao.id} radius='md' withBorder className='card-detail' mt={20}>
                                    <Text ta='left' fw={700} className='title'>
                                        {formatarDataPorExtenso(dataInicio)}
                                    </Text>

                                    <Text c='dimmed' ta='left' fz='sm'>
                                        {horasTrabalhadas}h / 8h
                                        {jornadaAdicional && ` (+${jornadaAdicional})`}
                                    </Text>

                                    <Group justify='space-between' mt='xs'>
                                        <Text fz='sm' c='dimmed'>
                                            Progresso
                                        </Text>
                                        <Text fz='sm' c='dimmed'>
                                            {Math.round(progresso)}%
                                        </Text>
                                    </Group>

                                    <Progress value={progresso} mt={5} />

                                    <Group justify='space-between' mt='md'>
                                        <Text fz='sm'>
                                            <strong>Observação: </strong>
                                            {marcacao.observacao}
                                        </Text>
                                    </Group>
                                </Paper>
                            );
                        })}

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
