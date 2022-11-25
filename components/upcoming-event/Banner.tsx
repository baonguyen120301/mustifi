import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import {
  createStyles,
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  Skeleton,
} from "@mantine/core";
import { marketplaceContract } from "../contract/marketplace";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  card: {
    height: 350,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.5,
    fontSize: 27,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 900,
    textTransform: "uppercase",
  },
}));

interface CardProps {
  cid: string;
  image: string;
  title: string;
  category: string;
}

function Card({ cid, image, title, category }: CardProps) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title
          variant="gradient"
          gradient={{ from: "red", to: "yellow" }}
          order={3}
          className={classes.title}
        >
          {title}
        </Title>
      </div>
      <Link href={"/concert/" + cid}>
        <Button variant="white" color="dark">
          Show More
        </Button>
      </Link>
    </Paper>
  );
}

// @ts-ignore
export default function Banner({ data, loading }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const Slides = () => {
    return (
      <>
        {data.length > 0 ? (
          // @ts-ignore
          data.map((item) => (
            <Carousel.Slide key={item.title}>
              <Card {...item} />
            </Carousel.Slide>
          ))
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      {loading ? (
        <Skeleton height={350} radius="xl" />
      ) : data.length > 0 ? (
        <Carousel
          slideSize="100%"
          breakpoints={[{ maxWidth: "sm", slideSize: "100%", slideGap: 1 }]}
          slideGap="sm"
          align="start"
          slidesToScroll={mobile ? 1 : 2}
        >
          <Slides />
        </Carousel>
      ) : (
        <></>
      )}
    </>
  );
}
