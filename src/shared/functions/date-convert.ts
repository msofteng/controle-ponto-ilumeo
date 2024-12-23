export function ajustarParaFusoHorarioLocal(dataUtc: string): Date {
    const dataUtcObj = new Date(dataUtc);

    const offsetMinutos = dataUtcObj.getTimezoneOffset();

    return new Date(dataUtcObj.getTime() - offsetMinutos * 60000 * -1);
}

export function ajustarFusoHorarioBrasilia(dataUtc: string): Date {
    const dataUtcObj = new Date(dataUtc);

    return new Date(dataUtcObj.getTime() - 3 * 60 * 60 * 1000);
}
