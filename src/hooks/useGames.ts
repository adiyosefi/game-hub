import {Platform} from "./usePlatforms";
import {GameQuery} from "../App";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_GAMES} from "../constants";
import apiClient, {FetchResponse} from "../services/api-client";

export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms: { platform: Platform }[];
    metacritic: number;
    rating_top: number;
}

const useGames = (gameQuery: GameQuery) => useQuery<FetchResponse<Game>, Error>({
    queryKey: CACHE_KEY_GAMES(gameQuery),
    queryFn: () =>
        apiClient
            .get<FetchResponse<Game>>('/games', {
                params: {
                    genres: gameQuery.genre?.id,
                    parent_platforms: gameQuery.platform?.id,
                    ordering: gameQuery.sortOrder,
                    search: gameQuery.searchText
                },
            })
            .then(res => res.data)
});

export default useGames;