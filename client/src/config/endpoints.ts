export const API_ROUTES = {
    // Articles
    'GET_ARTICLES_LIST': '/articles',
    'GET_ARTICLES_LIST_BY_GENRE': '/articles/search/getArticlesListByGenre/:genre',
    'GET_SINGLE_ARTICLE_BY_INDEX': '/articles/:index',
    'DELETE_SINGLE_ARTICLE_BY_INDEX': '/articles/:index',
    'GET_SEARCH_ARTICLES_BY_GENRE_AND_WORDS': '/articles/search/getArticlesByGenreAndWords',
    'GET_TOTAL_ARTICLES_COUNT_BY_GENRE_AND_WORDS': '/articles/search/getTotalArticlesCountByGenresAndWords',
    'GET_RANDOM_ARTICLES_LIST': '/articles/randomArticles/getRandomArticlesList',
    'GET_ALL_ARTICLES_AS_ADMIN': '/articles/admin',
    // Auth
    'GET_AUTH_USER_DATA': '/getUserData',
    'AUTH': '/login',
    'REFRESH_TOKEN': '/refreshToken',
    'GET_GOOGLE_AUTH': import.meta.env.VITE_BACKEND_URI + '/auth/google',
    // Metadata
    'GET_METADATA': '/metadata',
    'GET_ARTICLES_TOTAL_COUNT': '/metadata/getArticlesTotalCount',
    'GET_ARTICLES_TOTAL_COUNT_BY_GENRE': '/metadata/getArticlesTotalCountByGenre/:genre',
    // Users
    'POST_USER': '/users',
    'GET_USER': '/users',
    'GET_ALL_USERS': '/users/all',
    'POST_TOGGLE_ARTICLE_STATUS': '/users/favorites/toggle',
    'GET_USER_FAV_ARTICLES_LIST': '/users/favorites/getUserFavoriteArticlesList',
    'POST_USER_LAST_ARTICLE': '/users/lastsArticles/postLastArticle',
    'GET_USER_LAST_ARTICLES_LIST': '/users/lastArticles/getLastArticlesList',
    'GET_USER_AVATAR': '/users/avatar/getUserAvatar',
    'DELETE_USER_BY_INDEX': '/users/:index',
    'PATCH_USER_DATA': '/users/:index',
    'GET_USERS_COUNT': '/users/usersCount',
}