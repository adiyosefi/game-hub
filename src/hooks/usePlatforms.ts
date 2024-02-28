import platforms from "../data/platforms";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_PLATFORMS} from "../constants";
import platformsService from "../services/platformsService";

const usePlatforms = () => useQuery({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: platformsService.get,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    initialData: {count: platforms.length, results: platforms, next: null}
});

export default usePlatforms;