import { Group, Title, Text, createStyles } from "@mantine/core";
import ProcessingSale from "../../components/processing-sale/ProcessingSale";

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

export default function Processing() {
  const { classes } = useStyles();

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
              Tickets Are On Sale
            </Text>
          </Title>
        </Group>
        <div>
          <ProcessingSale />
        </div>
      </div>
    </Group>
  );
}
