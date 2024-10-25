export const timestampToLocalDate = (timestamp: number) => {

    return new Date(timestamp * 1000).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

}