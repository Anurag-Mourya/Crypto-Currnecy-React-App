import React from 'react'
import { Image } from '@chakra-ui/image';
import { Heading, VStack, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
const CoinCard = ({ id, name, image, symbol, price, currencySymbol}) => {
  return (
      <>
      
          <Link to={`/coin/${id}`}>
              <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{
                  '&:hover': {
                      transform: ('scale(1.1)')
                  }
              }}>

                  <Image src={image} w={'10'} h={'10'} objectFit={'contain'} alt={'Coins'} />
                  <Heading size={'md'} noOfLines={1}>{symbol}</Heading>
                  <Text noOfLines={1}>{name}</Text>
                  <Text noOfLines={1}>{price?`${currencySymbol}${price}`: 'Na'}</Text>

              </VStack>

          </Link>

      </>
  )
}

export default CoinCard