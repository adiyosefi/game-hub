import platforms from "../data/platforms";
import {useQuery} from "@tanstack/react-query";
import {CACHE_KEY_PLATFORMS} from "../constants";
import platformsService from "../services/platformsService";
import ms from "ms";

const usePlatforms = () => useQuery({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: platformsService.get,
    staleTime: ms('24h'),
    initialData: platforms
});

export default usePlatforms;