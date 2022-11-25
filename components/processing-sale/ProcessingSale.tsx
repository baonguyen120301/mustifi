import {
  createStyles,
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  ScrollArea,
  Paper,
  Skeleton,
  Image,
} from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { marketplaceContract } from "../contract/marketplace";
import Web3 from "web3";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  progressBar: {
    "&:not(:first-of-type)": {
      borderLeft: `3px solid ${
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
      }`,
    },
  },
}));

interface TableReviewsProps {
  concert: string;
  name: string;
  cid: string;
  start_date: string;
  end_date: string;
  price: string;
  ticket: { total: number; sold: number };
}

export default function ProcessingSale() {
  const [ticketData, setTicketData] = useState<Array<TableReviewsProps>>([]);
  const [isFinish, setIsFinish] = useState<Boolean>(false);
  const web3 = new Web3(Web3.givenProvider);

  async function getAllConcert() {
    const concerts = await marketplaceContract.methods.getAllConcerts().call();

    const data_array = [];
    for (let i = 0; i < concerts.length; i++) {
      const response = await axios.get(
        `https://mustifi.infura-ipfs.io/ipfs/${concerts[i]}`
      );
      const { name, image } = response.data;
      const totalTickets = await marketplaceContract.methods
        .getTotal(concerts[i])
        .call();
      const totalCount = await marketplaceContract.methods
        .getCount(concerts[i])
        .call();
      // total sold tickets
      const totalSold = Number(totalTickets) - Number(totalCount);

      const concert = await marketplaceContract.methods
        .getConeptByCid(concerts[i])
        .call();
      // get price start date and end date for selling
      const start_date = concert.start_date;
      const startDate = new Date(start_date * 1000);

      const end_date = concert.end_date;
      const endDate = new Date(end_date * 1000);
      // get status
      const now = new Date();
      const today = now.toISOString().slice(0, 10);
      const todayTime = new Date(today).getTime();

      if (todayTime < start_date * 1000) {
        continue;
      } else if (end_date * 1000 > todayTime && todayTime > start_date * 1000) {
      } else {
        continue;
      }

      const price = web3.utils.fromWei(concert.price.toString(), "ether");

      const concertData: TableReviewsProps = {
        concert: image,
        name: name,
        cid: concerts[i],
        start_date: startDate.toString().slice(3, 15),
        end_date: endDate.toString().slice(3, 15),
        price: price,
        ticket: {
          total: Number(totalTickets),
          sold: totalSold,
        },
      };
      data_array.push(concertData);
    }

    setTicketData(data_array);
    setIsFinish(true);
  }

  useEffect(() => {
    getAllConcert();
  }, []);

  const rows = ticketData!.map((row) => {
    const totalTicket = row.ticket.total;
    const soldTicket = row.ticket.sold;
    const percentage = (soldTicket / totalTicket) * 100;

    return (
      <tr key={row.name}>
        <td>
          <Image
            src={row.concert}
            width={110}
            height={110}
            alt={""}
            radius="md"
          />
        </td>
        <td>
          <Anchor<"a"> size="sm" href={"/concert/" + row.cid}>
            {row.name}
          </Anchor>
        </td>
        <td>{row.start_date}</td>
        <td>{row.end_date}</td>
        <td>{row.price}</td>
        <td>
          <Group position="left">
            <Text size="xs" transform="uppercase" weight={700} color="dimmed">
              Total sold ticket:
            </Text>
            <Text size="md" weight={500}>
              {soldTicket} / {totalTicket}
            </Text>
          </Group>
          <Progress value={percentage} mt="md" size="lg" radius="xl" />
        </td>
      </tr>
    );
  });

  function Waiting() {
    return (
      <>
        <tr>
          <td>
            <Skeleton height={110} mt={6} width={110} radius="md" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="70%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="40%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="90%" radius="xl" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton height={110} mt={6} width={110} radius="md" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="70%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="40%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="90%" radius="xl" />
          </td>
        </tr>
        <tr>
          <td>
            <Skeleton height={110} mt={6} width={110} radius="md" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="70%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="50%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="40%" radius="xl" />
          </td>
          <td>
            <Skeleton height={12} mt={6} width="90%" radius="xl" />
          </td>
        </tr>
      </>
    );
  }
  return (
    <Paper withBorder p="md" radius="md">
      <ScrollArea>
        <Table sx={{ minWidth: 1000 }} verticalSpacing="xs">
          <thead>
            <tr>
              <th>Concert</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price (BNB)</th>
              <th>Ticket Sales Progress</th>
            </tr>
          </thead>
          <tbody>{isFinish ? rows : <Waiting />}</tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
