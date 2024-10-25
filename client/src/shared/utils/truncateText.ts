export function truncateText(str: string, limit: number = 1000): string {
    if (str.length > limit) {
        const truncated = str.slice(0, limit);
        return `${truncated}…`; // Используйте многоточие
    }
    return str;
}
