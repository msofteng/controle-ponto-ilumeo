export default function toFixed(num: number, casasDecimais: number) {
    const [inteiro, decimal] = num.toString().split('.');
    if (!decimal || decimal.length <= casasDecimais) {
        return num.toFixed(casasDecimais);
    }
    return `${inteiro}.${decimal.slice(0, casasDecimais)}`;
}
