import {GameQuery} from "./store";

export const CACHE_KEY_GENRES = ['genres'];
export const CACHE_KEY_PLATFORMS = ['platforms'];
export const CACHE_KEY_GAMES = (gameQuery: GameQuery) => ['games', gameQuery];
