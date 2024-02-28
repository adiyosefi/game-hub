import {GameQuery} from "../App";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_GAMES} from "../constants";
import gamesService, {Game} from "../services/gamesService";
import {FetchResponse} from "../services/apiClient";

const useGames = (gameQuery: GameQuery) => useQuery<FetchResponse<Game>, Error>({
    queryKey: CACHE_KEY_GAMES(gameQuery),
    queryFn: () =>
        gamesService.get({
            params: {
                genres: gameQuery.genre?.id,
                parent_platforms: gameQuery.platform?.id,
                ordering: gameQuery.sortOrder,
                search: gameQuery.searchText
            }
        })
});

export default useGames;