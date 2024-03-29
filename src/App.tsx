import './App.css'
import {Box, Flex, Grid, GridItem, Show} from '@chakra-ui/react'
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import GenreList from "./components/GenreList";
import {useState} from "react";
import PlatformSelector from "./components/PlatformSelector";
import SortSelector from "./components/SortSelector";
import GameHeading from "./components/GameHeading";

export interface GameQuery {
    sortOrder: string;
    searchText: string;
    genreId?: number;
    platformId?: number;
}

function App() {
    const [gameQuery, setGameQuery] = useState<GameQuery>({} as GameQuery);

    return (
        <Grid
            templateAreas={{
                base: `"nav" "main"`,
                lg: `"nav nav" "aside main"`
            }}
            templateColumns={{
                base: '1fr',
                lg: '200px 1fr'
            }}
        >
            <GridItem area='nav'>
                <NavBar onSearch={(searchText) => setGameQuery({...gameQuery, searchText})}/>
            </GridItem>
            <Show above="lg">
                <GridItem area='aside' paddingX={5}>
                    <GenreList onSelectGenre={(genreId) => setGameQuery({...gameQuery, genreId})}
                               selectedGenreId={gameQuery.genreId}/>
                </GridItem>
            </Show>
            <GridItem area='main'>
                <Box paddingLeft={2}>
                    <GameHeading gameQuery={gameQuery}/>
                    <Flex marginBottom={5}>
                        <Box marginRight={5}>
                            <PlatformSelector selectedPlatformId={gameQuery.platformId}
                                              onSelectPlatform={(platformId) => setGameQuery({
                                                  ...gameQuery,
                                                  platformId
                                              })}/>
                        </Box>
                        <SortSelector sortOrder={gameQuery.sortOrder}
                                      onSelectSortOrder={(sortOrder) => setGameQuery({
                                          ...gameQuery,
                                          sortOrder: sortOrder
                                      })}/>
                    </Flex>
                </Box>
                <GameGrid gameQuery={gameQuery}/>
            </GridItem>
        </Grid>
    )
}

export default App
