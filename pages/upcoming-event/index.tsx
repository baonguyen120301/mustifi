import { createStyles, Group, Title, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { marketplaceContract } from "../../components/contract/marketplace";
import Upcoming from "../../components/upcoming-event/AllEvent";
import Banner from "../../components/upcoming-event/Banner";

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,
    marginBottom: 50,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 34,
      lineHeight: 1.15,
    },
  },
}));

interface CardProps {
  cid: string;
  image: string;
  title: string;
  date: string;
  category: string;
}

export default function UpcomingEvent() {
  const { classes } = useStyles();
  const [data, setData] = useState<Array<CardProps>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function getAllConcert() {
    const concerts = await marketplaceContract.methods.getAllConcerts().call();
    const concert_array = [];
    for (let i = 0; i < concerts.length; i++) {
      const concert = await axios.get(
        `https://mustifi.infura-ipfs.io/ipfs/${concerts[i]}`
      );
      const { image, name } = concert.data;

      const response = await marketplaceContract.methods
        .getConeptByCid(concerts[i])
        .call();
      const { start_date } = response;

      const startDate = new Date(start_date * 1000).toString().slice(3, 25);
      const data: CardProps = {
        cid: concerts[i],
        image: image,
        title: name,
        date: startDate,
        category: "Concert",
      };

      concert_array.push(data);
    }

    setData(concert_array);
    setLoading(false);
  }

  useEffect(() => {
    getAllConcert();
  }, []);

  return (
    <Group position="center">
      <div className={classes.root}>
        <Group position="center">
          <Title className={classes.title}>
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: "#5C7CFA", to: "#FF6B6B" }}
            >
              Upcoming Events
            </Text>
          </Title>
        </Group>
        <div>
          <Banner data={data} loading={loading} />
        </div>
        <Upcoming data={data} loading={loading} />
      </div>
    </Group>
  );
}
