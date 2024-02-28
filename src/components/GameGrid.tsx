import React from 'react'
import {SimpleGrid, Spinner, Text} from "@chakra-ui/react";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardSkeleton from "./GameCardSkeleton";
import GameCardContainer from "./GameCardContainer";
import InfiniteScroll from "react-infinite-scroll-component";

const GameGrid = () => {
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage
    } = useGames();
    const skeletons = [1, 2, 3, 4, 5, 6];

    if (error) return <Text>{error.message}</Text>;

    const fetchedGamesCount = data?.pages.reduce((total, page) => page.results.length + total, 0) || 0;

    return (
        <InfiniteScroll
            dataLength={fetchedGamesCount} // total num of items we have fetched so far
            hasMore={hasNextPage}
            next={() => fetchNextPage()}
            loader={<Spinner/>}>
            <SimpleGrid columns={{sm: 1, md: 2, lg: 3, xl: 4}} spacing={6} padding={2}>
                {isLoading && skeletons.map(skeleton => (
                    <GameCardContainer key={skeleton}>
                        <GameCardSkeleton/>
                    </GameCardContainer>))}
                {data?.pages.map((page, index) => (
                    <React.Fragment key={index}>
                        {page.results.map(game => (
                            <GameCardContainer key={game.id}>
                                <GameCard game={game}></GameCard>
                            </GameCardContainer>
                        ))}
                    </React.Fragment>
                ))}
            </SimpleGrid>
        </InfiniteScroll>
    )
}
export default GameGrid;
