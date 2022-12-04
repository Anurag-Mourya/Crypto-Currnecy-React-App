import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Stat,
  StatArrow,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Loder from "./Loder";
import { server } from "../index";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loding, setLoding] = useState(true);
  const [err, setErr] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();

  let currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ['24h', '7d', '14d', '30d', '200d', '1y', 'max'];

  useEffect(() => {
    const fechCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        setCoin(data);
        setLoding(false);
        // for cart data...
        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        setChartArray(chartData.prices);
      } catch (error) {
        setErr(true);
        setLoding(false);
      }
    };
    fechCoin();
  }, [params.id, currency, days]);

  if (err) {
    <ErrorComponent message={"Error While fatching coin"} />;
  }

  const switchChartStats = (value) => {
    switch (value) {
      case '7d':
        setDays('7d');
        setLoding(true)
        break;
      case '14d':
        setDays('14d');
        setLoding(true)
        break;
      case '30d':
        setDays('30d');
        setLoding(true)
        break;
      case '200d':
        setDays('200d');
        setLoding(true)
        break;
      case '1y':
        setDays('365d');
        setLoding(true)
        break;
      case 'max':
        setDays('max');
        setLoding(true)
        break;

      default:
        setDays('24h');
        break;
    }
  }
  return (
    <Container maxW={"container.xl"}>
      {loding ? (
        <Loder />
      ) : (
        <>
          <Box width={"full"} borderWidth={1}>
            <Chart currency={currencySymbol} arr={chartArray} days={days} />
          </Box>

          <HStack p={'4'} wrap={'wrap'} overflowX={'auto'}>
            {
              btns.map((i) => {
                return (
                  <>
                    <Button key={i} m={'4'}  onClick={() => switchChartStats(i)}>{i}</Button>
                  </>
                )
              })
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} >
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
              last Updated on {""}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image
              src={`${coin.image.large}`}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h < 0
                      ? "decrease"
                      : "increase"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />
            <Box w={"full"} p={"4"}>
              {" "}
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={`${coin.market_data.circulating_supply}`}
              />
              <Item
                title={"Market Capital"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />
              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"}>
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}> 24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

const Item = ({ title, value }) => {
  return (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
};
export default CoinDetails;
