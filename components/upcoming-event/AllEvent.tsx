import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Skeleton,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",
    width: 300,

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

// @ts-ignore
export default function Upcoming({ data, loading }) {
  const { classes } = useStyles();

  // @ts-ignore
  const cards = data.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href={"/concert/" + article.cid}
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        Start at: {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  const Loading = () => {
    return (
      <>
        <Card p="md" radius="md" component="a" className={classes.card}>
          <Skeleton height={230} radius="xs" />
        </Card>
        <Card p="md" radius="md" component="a" className={classes.card}>
          <Skeleton height={230} radius="xs" />
        </Card>
        <Card p="md" radius="md" component="a" className={classes.card}>
          <Skeleton height={230} radius="xs" />
        </Card>
      </>
    );
  };

  return (
    <Container py="xl">
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "md", cols: 1 }]}>
        {loading ? <Loading /> : cards}
      </SimpleGrid>
    </Container>
  );
}
