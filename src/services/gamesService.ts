import APIClient from "./apiClient";
import {Game} from "../entities/Game";

export default new APIClient<Game>('/games');
