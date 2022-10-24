import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
    Button,
    Burger,
  } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import Image from 'next/image';
import image from '../public/Mustifi.svg'

  
  const HEADER_HEIGHT = 80;
  
  const useStyles = createStyles((theme) => ({
    inner: {
      height: HEADER_HEIGHT,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottom: "1px solid #e9ecef",
    },
  
    links: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none',
      },
    },
  
    burger: {
      [theme.fn.largerThan('sm')]: {
        display: 'none',
      },
    },
  
    link: {
      display: 'block',
      lineHeight: 1,
      padding: '8px 12px',
      borderRadius: theme.radius.sm,
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    },
  
    linkLabel: {
      marginRight: 5,
    },
  }));
  
  interface HeaderActionProps {
    links: { link: string; label: string; links?: { link: string; label: string }[] }[];
  }
  
  export default function HeaderAction({ links }: HeaderActionProps) {
    const { classes } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);
    const items = links.map((link) => {
      const menuItems = link.links?.map((item) => (
        <>
          <a href={item.link}>
            <Menu.Item key={item.link}>{item.label}</Menu.Item>
          </a>
        </>
      ));
  
      if (menuItems) {
        return (
          <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
            <Menu.Target>
              <a
                href={link.link}
                className={classes.link}
                //onClick={(event) => event.preventDefault()}
              >
                <Center>
                  <span className={classes.linkLabel}>{link.label}</span>
                  <IconChevronDown size={12} stroke={1.5} />
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>{menuItems}</Menu.Dropdown>
          </Menu>
        );
      }
  
      return (
        <a
          key={link.label}
          href={link.link}
          className={classes.link}
          //onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </a>
      );
    });
  
    return (
      <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} >
        <Container className={classes.inner} fluid>
          <Group>
            <Image height={80} width={80} src={image}/>
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Button radius="lg" sx={{ height: 50 }}>
            Connect Wallet
          </Button>
        </Container>
      </Header>
    );
  }