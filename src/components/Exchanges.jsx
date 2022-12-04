import { Image } from '@chakra-ui/image';
import { Container, Heading, HStack, VStack, Text } from '@chakra-ui/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Loder from './Loder';

const Exchanges = () => {
    const [exchanges, setExchanges] = useState([]);
    const [loding, setLoding] = useState(true);
    const [err, setErr] = useState(false);


    // const fetchData = () => {
    //     axios.get(`${server}/exchanges`).
    //         then((responce) => {
    //             // console.log(responce.data)
    //             setExchanges(responce.data);
    //             setLoding(false)
    //         }).catch((error) => {
    //             setErr(true);
    //             setLoding(false);
    //         })
    // }

    // or#

    useEffect(() => {
        const fechExchanges = async () => {
            try {
                const { data } = await axios.get(`${server}/exchanges`);//if we do data then we be should be do data.data for fetch all the data
                console.log(data);
                setExchanges(data);
                setLoding(false);

            } catch (error) {
                setErr(true)
                setLoding(false);
            }
        }
        fechExchanges()


        // fetchData()

    }, [])

    if(err){
        return <ErrorComponent message='error while fatching exchanges'/>
    }

    return (
        <Container maxW={'container.lg'}>
            {loding ? <Loder /> : (<>
                <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                    {exchanges.map((items) => {
                        return (
                            <ExchangeCard key={items.id} name={items.name} image={items.image} rank={items.trust_score_rank} url={items.url} />
                        )
                    })}
                </HStack>
            </>)}
        </Container>
    )
}

export default Exchanges;

const ExchangeCard = ({ name, image, rank, url }) => {
    return (
        <>
            <a href={url} target="blank">
                <VStack w={'52'} shadow={'lg'} p={'8'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} css={{
                    '&:hover': {
                        transform: ('scale(1.1)')
                    }
                }}>

                    <Image src={image} w={'10'} h={'10'} objectFit={'contain'} alt={'Exchanges'} />
                    <Heading size={'md'} noOfLines={1}>{rank}</Heading>
                    <Text noOfLines={1}>{name}</Text>

                </VStack>

            </a>

        </>
    )
}