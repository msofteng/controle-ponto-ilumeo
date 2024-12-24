// Função para dividir as marcações em páginas (10 por página)
export const chunk = <T>(array: T[], size: number): T[][] => {
    if (!array.length) {
        return [];
    }
    const head = array.slice(0, size);
    const tail = array.slice(size);
    return [head, ...chunk(tail, size)];
};

export function gerarToken(size: number) {
    let token = '';

    while (token.length < size) {
        token += Math.random().toString(36).substring(2);
    }

    return token.substring(0, size);
}
