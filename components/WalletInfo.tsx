import {
  UnstyledButton,
  UnstyledButtonProps,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "12%",
    padding: theme.spacing.md,
    color: "black",
    backgroundImage: "linear-gradient(to right, #1C7ED6 , #A5D8FF)",
    borderRadius: "10px",
    transition: "all 0.3s",
    "&:hover": {
      backgroundImage: "linear-gradient(to right, #1C7ED6 , #4DABF7)",
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  wallet: string | null;
}

export default function UserButton({ image, wallet }: UserButtonProps) {
  const { classes } = useStyles();

  let char = [];
  if (wallet) {
    for (let i = 0; i < wallet.length; i++) {
      char.push(wallet[i]);
    }
  }
  const shortedWallet = [
    char[0],
    char[1],
    char[2],
    "...",
    char[char.length - 4],
    char[char.length - 3],
    char[char.length - 2],
    char[char.length - 1],
    char[char.length],
  ];

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="md" weight={400}>
            {shortedWallet}
          </Text>
        </div>
        <IconChevronRight size={12} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
