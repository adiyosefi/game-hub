import {useInfiniteQuery} from "@tanstack/react-query";
import {CACHE_KEY_GAMES} from "../constants";
import gamesService from "../services/gamesService";
import {FetchResponse} from "../services/apiClient";
import ms from "ms";
import useGameQueryStore from "../store";
import {Game} from "../entities/Game";

const useGames = () => {
    const gameQuery = useGameQueryStore(s => s.gameQuery);

    return useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: CACHE_KEY_GAMES(gameQuery),
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            gamesService.getAll({
                params: {
                    genres: gameQuery.genreId,
                    parent_platforms: gameQuery.platformId,
                    ordering: gameQuery.sortOrder,
                    search: gameQuery.searchText,
                    page: pageParam
                }
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        },
        staleTime: ms('24h'),
    });
}

export default useGames;