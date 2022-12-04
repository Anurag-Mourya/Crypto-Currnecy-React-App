import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import Loder from "./Loder";
import CoinCard from "./CoinCard";
import { Container, HStack } from "@chakra-ui/layout";
import { Button, Radio, RadioGroup  } from "@chakra-ui/react";

const Coins = () => {
    const [Coins, setCoins] = useState([]);
    const [loding, setLoding] = useState(true);
    const [err, setErr] = useState(false);
    const [page, setPage] = useState("1");
    const [currency, setCurrency] = useState("inr");

    let currencySymbol =
        currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";



    // const fetchData = () => {
    //     axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`).
    //         then((responce) => {
    //             // console.log(responce.data)
    //             setCoins(responce.data);
    //             setLoding(false)
    //         }).catch((error) => {
    //             setErr(true);
    //             setLoding(false);
    //         })
    // }

    useEffect(() => {
        const fechCoins = async () => {
            try {
                const { data } = await axios.get(
                    `${server}/coins/markets?vs_currency=${currency}&page=${page}`
                ); //if we do data then we be should be do data.data for fetch all the data
                setCoins(data);
                setLoding(false);
            } catch (error) {
                setErr(true);
                setLoding(false);
            }
        };
        fechCoins();
        // fetchData()
    }, [currency, page]);

    if (err) {
        return <ErrorComponent message="error while fatching Coins" />
    }

    const changePage = (page) => {
        setPage(page);
        setLoding(true);
    };

    const btns = new Array(132).fill(1)//write 1,1,1... 132times...
    //there are 123 button for 123 pages..
    return (
        <Container maxW={"container.lg"}>
            {loding ? (
                <Loder />
            ) : (


                <>
                    <RadioGroup value={currency} onChange={setCurrency}>
                        <HStack spacing={'4'}>
                            <Radio value={"inr"}>INR</Radio>
                            <Radio value={"usd"}>USD</Radio>
                            <Radio value={"eur"}>EUR</Radio>
                        </HStack>
                    </RadioGroup>
                    <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                        {Coins.map((items) => {
                            return (
                                <CoinCard
                                    key={items.id}
                                    name={items.name}
                                    image={items.image}
                                    symbol={items.symbol}
                                    url={items.url}
                                    id={items.id}
                                    price={items.current_price}
                                    currencySymbol={currencySymbol}
                                />
                            );
                        })}
                    </HStack>
                    <HStack w={'full'} overflowX={'auto'} p={'8'}>
                        {btns.map((items, index) => {
                            return <>
                                <Button
                                    key={index}
                                    bgColor={"blackAlpha.900"}
                                    color={"white"}
                                    onClick={() => changePage(index + 1)}
                                >
                                    {index + 1}
                                </Button>
                            </>
                        })}
                    </HStack>
                </>
            )}
        </Container>
    );
};

export default Coins;
