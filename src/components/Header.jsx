import React from 'react';
import { HStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <HStack p={4} shadow={'base'} bgColor={'blackAlpha.900'}>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/'>Home</Link>
            </Button>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/exchanges'>Exchanges</Link>
            </Button>
            <Button variant={'unstyled'} color={'white'}>
                <Link to='/coins'>Coins</Link>
            </Button>
        </HStack>
    )
}

export default Header