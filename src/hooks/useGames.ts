import {GameQuery} from "../App";
import {useInfiniteQuery} from "@tanstack/react-query";
import {CACHE_KEY_GAMES} from "../constants";
import gamesService, {Game} from "../services/gamesService";
import {FetchResponse} from "../services/apiClient";

const useGames = (gameQuery: GameQuery) =>
    useInfiniteQuery<FetchResponse<Game>, Error>({
        queryKey: CACHE_KEY_GAMES(gameQuery),
        initialPageParam: 1,
        queryFn: ({pageParam}) =>
            gamesService.get({
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
        staleTime: 24 * 60 * 60 * 1000 // 24h
    });

export default useGames;