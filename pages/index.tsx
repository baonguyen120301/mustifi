import { createStyles, Container, Title, Text, Button, Group } from '@mantine/core';
import ListEvent from './ListEvent';
import FeaturesCards from './Features';

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      'linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(https://raw.githubusercontent.com/baonguyen120301/mustifi-assets/a667db280429d05c9b0905a83895c140a7bea865/background.svg)',
    paddingTop: theme.spacing.xl * 10,
    paddingBottom: theme.spacing.xl * 2,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 250,

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 3,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },

  title: {
    color: theme.white,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: 50,
    paddingRight: 50,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '100%',
    },
  },
}));

export default function MustifiHome() {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'yellow' }}
              >
                decentralize marketplace
              </Text>{' '}
            </Title>

            <Text className={classes.description} mt={30}>
              Mustifi is a web3 platform where anyone can buy concert tickets on a decentralized space
            </Text>

            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button>
          </div>
        </div>
        <FeaturesCards/>
        <Group position="center">
          <Title className={classes.title}>
            <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{ from: '#5C7CFA', to: '#FF6B6B' }}
            >
              Upcoming events
            </Text>
          </Title>
        </Group>
        <br></br>
        <ListEvent />
      </Container>
    </div>
  );
}
