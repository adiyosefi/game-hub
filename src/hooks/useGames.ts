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
                    genres: gameQuery.genre?.id,
                    parent_platforms: gameQuery.platform?.id,
                    ordering: gameQuery.sortOrder,
                    search: gameQuery.searchText,
                    page: pageParam
                }
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.next ? allPages.length + 1 : undefined;
        }
    });

export default useGames;