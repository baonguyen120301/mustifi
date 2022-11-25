import {
  createStyles,
  Text,
  Title,
  TextInput,
  Button,
  Image,
  Skeleton,
  Group,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { marketplaceContract } from "../../components/contract/marketplace";
import Web3 from "web3";
import LaunchCountdown from "../../components/LaunchCountdown";
import styles from "./style.module.scss";

const useStyles = createStyles((theme) => ({
  root: {
    margin: 100,
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "87vw",
    padding: theme.spacing.xl * 2,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",
    marginLeft: 100,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  body: {
    paddingRight: theme.spacing.xl * 4,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 2,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  text: {
    marginBottom: 20,
  },

  soonText: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 30,
    marginBottom: 20,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      fontSize: 24,
      lineHeight: 1.15,
    },
  },
}));

type TypeForSale = "soon" | "pending" | "finish";

export default function ConcertDetail() {
  const web3 = new Web3(Web3.givenProvider);
  const { classes } = useStyles();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  let [image, setImage] = useState<string>("");
  const [status, setStatus] = useState<TypeForSale>("pending");
  const [price, setPrice] = useState<string>("");
  const [diff, setDiff] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const router = useRouter();
  const cid = router.query.cid;

  async function CheckCid() {
    const response = await axios
      .get(`https://mustifi.infura-ipfs.io/ipfs/${cid}`)
      .catch((err) => {
        router.push("/404");
      });

    if (response) {
      const { name, description, image } = response?.data;
      setImage(image);
      setName(name);
      setDescription(description);

      const concert = await marketplaceContract.methods
        .getConeptByCid(cid)
        .call();

      const { start_date, end_date, price, tokenIds } = concert;

      const price_for_sale = web3.utils.fromWei(price.toString(), "ether");
      const startDate = new Date(start_date * 1000);
      setStartDate(startDate.toString().slice(3, 24));
      setPrice(price_for_sale.toString());

      const now = new Date().getTime();
      if (now < start_date * 1000) {
        setStatus("soon");
        const diff = start_date * 1000 - now;
        setDiff(diff);
      } else if (now > end_date * 1000) {
        setStatus("finish");
      } else {
        setStatus("pending");
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    if (cid) {
      setLoading(true);
      CheckCid();
    }
  }, [cid]);

  return (
    <div className={classes.root}>
      <Skeleton visible={loading}>
        <div className={classes.wrapper}>
          <div className={classes.body}>
            <Title
              className={classes.title}
              variant="gradient"
              gradient={{ from: "pink", to: "yellow" }}
            >
              {name}
            </Title>
            <Text weight={500} size="lg" mb={5}>
              Price for Sale: {price} BNB
            </Text>
            <Text size="sm" color="dimmed" className={classes.text}>
              {description}
            </Text>
            <Text size="md" color="dark" className={classes.text}>
              Tickets open on sale on: {startDate}
            </Text>
            {status == "pending" ? (
              <Button
                variant="gradient"
                gradient={{ from: "orange", to: "red" }}
                size="md"
                fullWidth
              >
                Buy Now
              </Button>
            ) : status == "soon" ? (
              <Group position="center">
                <Title className={classes.soonText}>
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "#5C7CFA", to: "#FF6B6B" }}
                  >
                    We will open ticket sales soon
                  </Text>
                </Title>

                <div className={styles.container}>
                  <LaunchCountdown timestamp={diff} />
                </div>
              </Group>
            ) : (
              <Group position="center">
                <Title>
                  <Text
                    component="span"
                    inherit
                    variant="gradient"
                    gradient={{ from: "#5C7CFA", to: "#FF6B6B" }}
                  >
                    Ticket sales have ended
                  </Text>
                </Title>
              </Group>
            )}
          </div>
          <Image src={image} radius="xl" className={classes.image} />
        </div>
      </Skeleton>
    </div>
  );
}
