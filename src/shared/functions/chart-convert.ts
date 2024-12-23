import { GraficoData, GraficoDiario, Marcacao } from '../models/interfaces/controle-ponto.entities';
import toFixed from './number';

export function converterMarcacoesEmGrafico(marcacoes: Marcacao[]): GraficoData {
    const agruparPorMes = (date: Date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;

    const acumulados: Record<string, { horasTrabalhadas: number; horasAusentes: number }> = {};

    marcacoes.forEach((marcacao) => {
        const dataInicio = new Date(marcacao.inicio);
        const dataTermino = marcacao.termino ? new Date(marcacao.termino) : null;

        const mesAno = agruparPorMes(dataInicio);

        if (!acumulados[mesAno]) {
            acumulados[mesAno] = { horasTrabalhadas: 0, horasAusentes: 0 };
        }

        if (dataTermino) {
            const horasTrabalhadas = (dataTermino.getTime() - dataInicio.getTime()) / (1000 * 60 * 60);

            const inicioAlmoco = new Date(dataInicio);
            inicioAlmoco.setHours(12, 0, 0, 0);
            const terminoAlmoco = new Date(dataInicio);
            terminoAlmoco.setHours(13, 0, 0, 0);

            let horasDeTrabalhoConsiderandoAlmoco = horasTrabalhadas;
            if (dataInicio < terminoAlmoco && dataTermino > inicioAlmoco) {
                horasDeTrabalhoConsiderandoAlmoco = Math.max(0, horasTrabalhadas - 1);
            }

            const horasAusentes = Math.max(0, 8 - horasDeTrabalhoConsiderandoAlmoco);

            acumulados[mesAno].horasTrabalhadas += horasDeTrabalhoConsiderandoAlmoco;
            acumulados[mesAno].horasAusentes += horasAusentes;
        }
    });

    const categories = Object.keys(acumulados)
        .sort()
        .map((mesAno) => {
            const [ano, mes] = mesAno.split('-');
            const mesNome = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
                new Date(parseInt(ano), parseInt(mes) - 1)
            );
            return `${mesNome.charAt(0).toUpperCase() + mesNome.slice(1)}/${ano}`;
        });

    const horasTrabalhadas = Object.keys(acumulados)
        .sort()
        .map((mesAno) => acumulados[mesAno].horasTrabalhadas);

    const horasAusentes = Object.keys(acumulados)
        .sort()
        .map((mesAno) => acumulados[mesAno].horasAusentes);

    return {
        categories,
        series: [
            {
                name: 'Horas Trabalhadas',
                data: horasTrabalhadas.map((v) => Number(toFixed(v, 0))),
                color: 'var(--bg-color-default)',
            },
            {
                name: 'Horas Ausentes',
                data: horasAusentes.map((v) => Number(toFixed(v, 0))),
                color: 'var(--bg-color-primary)',
            },
        ],
    };
}

export function converterMarcacoesEmGraficoDiario(marcacoes: Marcacao[]): GraficoDiario {
    const agruparPorDia = (date: Date) => {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${dia}/${mes}`;
    };

    const acumulados: Record<string, { horasTrabalhadas: number; horasAusentes: number }> = {};

    marcacoes.forEach((marcacao) => {
        const dataInicio = new Date(marcacao.inicio);
        const dataTermino = marcacao.termino ? new Date(marcacao.termino) : null;

        const diaMes = agruparPorDia(dataInicio);

        if (!acumulados[diaMes]) {
            acumulados[diaMes] = { horasTrabalhadas: 0, horasAusentes: 0 };
        }

        if (dataTermino) {
            const horasTrabalhadas = (dataTermino.getTime() - dataInicio.getTime()) / (1000 * 60 * 60);

            const inicioAlmoco = new Date(dataInicio);
            inicioAlmoco.setHours(12, 0, 0, 0);
            const terminoAlmoco = new Date(dataInicio);
            terminoAlmoco.setHours(13, 0, 0, 0);

            let horasDeTrabalhoConsiderandoAlmoco = horasTrabalhadas;
            if (dataInicio < terminoAlmoco && dataTermino > inicioAlmoco) {
                horasDeTrabalhoConsiderandoAlmoco = Math.max(0, horasTrabalhadas - 1);
            }

            const horasAusentes = Math.max(0, 8 - horasDeTrabalhoConsiderandoAlmoco);

            acumulados[diaMes].horasTrabalhadas += horasDeTrabalhoConsiderandoAlmoco;
            acumulados[diaMes].horasAusentes += horasAusentes;
        }
    });

    const data = Object.keys(acumulados)
        .sort((a, b) => {
            const [diaA, mesA] = a.split('/');
            const [diaB, mesB] = b.split('/');
            const dataA = new Date(`2024-${mesA}-${diaA}`);
            const dataB = new Date(`2024-${mesB}-${diaB}`);
            return dataA.getTime() - dataB.getTime();
        })
        .map((diaMes) => ({
            dia: diaMes,
            Trabalhadas: Number(toFixed(acumulados[diaMes].horasTrabalhadas, 2)),
            Ausentes: Number(toFixed(acumulados[diaMes].horasAusentes, 2)),
        }));

    const series = [
        { name: 'Trabalhadas', color: 'var(--bg-color-default)' },
        { name: 'Ausentes', color: 'var(--color-ilumeo)' },
    ];

    return { data, series };
}
