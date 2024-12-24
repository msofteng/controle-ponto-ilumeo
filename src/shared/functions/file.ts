export function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Erro ao converter arquivo para base64.'));
            }
        };

        reader.onerror = (error) => reject(error);

        reader.readAsDataURL(file);
    });
}

export function base64ToFile(base64: string, filename: string): File {
    const [metadata, data] = base64.split(',');
    const mime = metadata.match(/:(.*?);/)?.[1] || '';
    const byteString = atob(data); // Decodifica o conteúdo base64
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        arrayBuffer[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mime }); // Cria um Blob com o tipo MIME
    return new File([blob], filename, { type: mime }); // Converte o Blob em um File
}
