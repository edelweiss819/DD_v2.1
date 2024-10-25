import {IArticle} from './article.ts';


export interface IArticlesList {
    articlesList: IArticle[];
    onClick?: (index: number) => void;
}