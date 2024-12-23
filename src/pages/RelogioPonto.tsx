import { DonutChart } from '@mantine/charts';
import { Button, Group, Pagination, Paper, Progress, Text, Textarea, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ajustarFusoHorarioBrasilia } from '../shared/functions/date-convert';
import { Marcacao, Usuario } from '../shared/models/interfaces/controle-ponto.entities';

import Card from '../shared/components/Card';
import toFixed from '../shared/functions/number';
import service from '../shared/services/service';

export function RelogioPonto(props: { user?: Usuario }) {
    const [marcacoes, setMarcacoes] = useState<Marcacao[]>([]);
    const [tempoTrabalhado, setTempoTrabalhado] = useState<number>(0);
    const [tempoRestante, setTempoRestante] = useState<number>(28800);
    const [iniciado, setIniciado] = useState<boolean>(false);
    const [observacao, setObservacao] = useState<string>('');
    const [marcacaoAtual, setMarcacaoAtual] = useState<Marcacao | null>(null);

    useEffect(() => {
        service.getAllMarks(Number(props.user?.id)).then((marcacoes) => {
            setMarcacoes(marcacoes.reverse());

            const ultimaMarcacao = marcacoes.find((m) => m.termino === null);
            if (ultimaMarcacao) {
                setMarcacaoAtual(ultimaMarcacao);
                setIniciado(true);

                const inicioEmSegundos = Math.floor(new Date(ultimaMarcacao.inicio).getTime() / 1000);
                const agoraEmSegundos = Math.floor(
                    ajustarFusoHorarioBrasilia(new Date().toISOString()).getTime() / 1000
                );
                const tempoDecorrido = agoraEmSegundos - inicioEmSegundos;
                setTempoTrabalhado(tempoDecorrido);
                setTempoRestante(28800 - tempoDecorrido);
            }
        });
    }, [props.user?.id]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (iniciado) {
            interval = setInterval(() => {
                setTempoTrabalhado((prev) => prev + 1);
                setTempoRestante((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [iniciado]);

    const formatarTempo = (tempo: number) => {
        const horas = Math.floor(tempo / 3600);
        const minutos = Math.floor((tempo % 3600) / 60);
        const segundos = tempo % 60;
        return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    };

    const iniciarTurno = async () => {
        const agora = new Date();
        const novaMarcacao: Marcacao = {
            inicio: ajustarFusoHorarioBrasilia(agora.toISOString()).toISOString(),
            termino: null,
            observacao: observacao,
            usuarioId: Number(props.user?.id),
        };
        const novaMarcacaoSalva = await service.createMark(Number(props.user?.id), novaMarcacao);
        setMarcacaoAtual(novaMarcacaoSalva);
        setIniciado(true);
        setTempoTrabalhado(0);
        setTempoRestante(28800);
    };

    const finalizarTurno = async () => {
        if (marcacaoAtual) {
            const agora = new Date();
            const marcacaoAtualizada: Marcacao = {
                ...marcacaoAtual,
                termino: ajustarFusoHorarioBrasilia(agora.toISOString()).toISOString(),
                observacao,
            };
            await service.updateMark(marcacaoAtualizada);
        }

        setIniciado(false);
        setObservacao('');
        service.getAllMarks(Number(props.user?.id)).then((marcacoes) => setMarcacoes(marcacoes.reverse()));
    };

    const excluirPonto = (id: number) => {
        service.removeMark(id);
        setMarcacoes(marcacoes.filter((mark) => mark.id !== id));
    };

    const calcularHorasTrabalhadas = (
        dataInicio: Date,
        dataTermino: Date | null
    ): { horasTrabalhadas: number; horasAusentes: number } => {
        if (!dataTermino) return { horasTrabalhadas: 0, horasAusentes: 8 };

        const horasTrabalhadas = (dataTermino.getTime() - dataInicio.getTime()) / (1000 * 60 * 60);

        const horaAlmocoInicio = new Date(dataInicio);
        horaAlmocoInicio.setHours(12, 0, 0, 0);
        const horaAlmocoFim = new Date(dataInicio);
        horaAlmocoFim.setHours(13, 0, 0, 0);

        let horasAlmoco = 0;
        if (dataInicio < horaAlmocoFim && dataTermino > horaAlmocoInicio) {
            horasAlmoco = 1;
        }

        const horasTrabalhadasCorrigidas = Math.max(0, horasTrabalhadas - horasAlmoco);

        const horasAusentes = Math.max(0, 8 - horasTrabalhadasCorrigidas);

        return { horasTrabalhadas: horasTrabalhadasCorrigidas, horasAusentes };
    };

    const calcularJornadaAdicional = (horasTrabalhadas: number) => {
        const jornadaBase = 8;
        if (horasTrabalhadas > jornadaBase) {
            const horasAdicionais = horasTrabalhadas - jornadaBase;
            const horas = Math.floor(horasAdicionais);
            const minutos = Math.round((horasAdicionais - horas) * 60);
            return `${horas}h ${minutos}m`;
        }
        return null;
    };

    const calcularProgresso = (horasTrabalhadas: number) => {
        const jornadaBase = 8;
        const progresso = Math.min((horasTrabalhadas / jornadaBase) * 100, 100);
        return progresso;
    };

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
                            {formatarTempo(tempoTrabalhado)}{' '}
                            {Array.from({ length: 5 }).map(() => (
                                <>&nbsp;</>
                            ))}{' '}
                            {formatarTempo(tempoRestante > 0 ? tempoRestante : 0)}
                        </Title>

                        <Title order={6}>
                            Horas de Hoje{' '}
                            {Array.from({ length: 12 }).map(() => (
                                <>&nbsp;</>
                            ))}{' '}
                            Tempo Restante
                        </Title>

                        <Textarea
                            mt={'md'}
                            label='Observação'
                            description='Adicione uma observação ou justificativa'
                            placeholder='Ex.: Exame Médico as 16:00, Entrando mais tarde, ...'
                            autosize
                            className='obs-turno'
                            value={observacao}
                            onChange={(e) => setObservacao(e.target.value)}
                        />

                        <Button mt='md' variant='filled' onClick={iniciado ? finalizarTurno : iniciarTurno}>
                            {iniciado ? 'FINALIZAR TURNO' : 'INICIAR TURNO'}
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
                                        {toFixed(horasTrabalhadas, 2)}h / 8h
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

                                    <IconTrash
                                        className='btn-delete-mark'
                                        onClick={() => excluirPonto(Number(marcacao.id))}
                                    />
                                </Paper>
                            );
                        })}

                        {marcacoes.length > 5 ? <Pagination radius={'md'} total={5} /> : <br />}
                    </div>
                    <div className='grafico-ponto'>
                        <DonutChart
                            data={[
                                {
                                    name:
                                        'Tempo Trabalhado (' +
                                        formatarTempo(tempoTrabalhado > 0 ? tempoTrabalhado : 0) +
                                        ')',
                                    value: tempoTrabalhado,
                                    color: 'rgba(var(--bg-color-default-rgb), 0.9)',
                                },
                                {
                                    name:
                                        'Tempo Restante (' + formatarTempo(tempoRestante > 0 ? tempoRestante : 0) + ')',
                                    value: tempoRestante,
                                    color: 'var(--bg-color-primary)',
                                },
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
