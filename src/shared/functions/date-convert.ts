export function ajustarParaFusoHorarioLocal(dataUtc: string): Date {
    const dataUtcObj = new Date(dataUtc);

    const offsetMinutos = dataUtcObj.getTimezoneOffset();

    return new Date(dataUtcObj.getTime() - offsetMinutos * 60000 * -1);
}
