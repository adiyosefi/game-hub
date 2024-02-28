import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_GENRES} from "../constants";
import genres from "../data/genres";
import genresService from "../services/genresService";

const useGenres = () => useQuery({
    queryKey: CACHE_KEY_GENRES,
    queryFn: genresService.get,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: {count: genres.length, results: genres}
});

export default useGenres;