export const articlesCountToPagesCount = (articlesCount: number,
                                          articlesPerPage: number = 10): number => Math.ceil(articlesCount / articlesPerPage);
