export interface IAuthor {
    name: string;
    index: number;
}

export interface IArticle {
    _id?: string;
    title: string;
    genres: Array<string>;
    content: string;
    index: number
    publishedDate: number,
    estimatedReadingTime: number,
    characterCount: number,
    onClick?: () => void,
    author: IAuthor
}