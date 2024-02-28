import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_GENRES} from "../constants";
import genres from "../data/genres";
import genresService from "../services/genresService";
import ms from 'ms';

const useGenres = () => useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: genresService.get,
    staleTime: ms('24h'),
    initialData: genres
});

export default useGenres;