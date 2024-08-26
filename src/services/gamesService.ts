import APIClient from "./apiClient";
import {Platform} from "./platformsService";

export interface Game {
  id: number;
  name: string;
  slug: string;
  description_raw: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

export default new APIClient<Game>('/games');
