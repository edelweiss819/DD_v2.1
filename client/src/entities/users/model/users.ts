export interface IFavoriteArticle {
    index: number,
    title: string,
}

export interface ILastArticle {
    index: number,
    title: string,
    timestamp: number,
}

export type FavoriteArticlesList = IFavoriteArticle[]
export type LastArticlesList = ILastArticle[];


export interface IUser {
    firstName: string | undefined,
    lastName: string | undefined,
    email: string | undefined,
    password: string | undefined,
    role: string | undefined,
    favoriteArticles: FavoriteArticlesList,
    lastArticles: LastArticlesList
    index: number | undefined
    registrationDate: number | undefined,

}