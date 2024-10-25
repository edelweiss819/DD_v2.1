import {GENRES} from '../../constants';

export const generateGenreByLink = (genreLink: string) => {
    const genreName = Object.entries(GENRES).find(([, value]) => value === `/${genreLink}`);
    return genreName ? genreName[0] : null
}