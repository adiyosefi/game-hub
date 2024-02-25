import React from 'react'
import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {BsSearch} from "react-icons/all";

const SearchInput = () => {
    return (
        <InputGroup>
            <InputLeftElement><BsSearch /></InputLeftElement>
            <Input borderRadius={20} placeholder='Search games...' variant='filled'/>
        </InputGroup>
    )
}
export default SearchInput
