import type { NextPage } from 'next'
import { useState } from "react"
import { createStyles, TextInput, Group, FileInput, Button, NumberInput } from '@mantine/core';
import {create} from 'ipfs-http-client';

const useStyles = createStyles((theme) => ({
  root: {
    marginTop: 50,
  },
  child: {
    marginTop: 50,
    marginBottom: 400
  }
}));

const Home: NextPage = () => {

  type StringOrNull = String | null;
  type NumberOrNull = Number | null;
  type FileOrNull = File | null;

  interface metadata {
    name: StringOrNull,
    age: Number,
    image: String
  }

  const {classes} = useStyles();
  const [file, setFile] = useState<FileOrNull>(null);
  const [name, setName] = useState<StringOrNull>(null);
  const [age, setAge] = useState<Number>(0);
  const [finished, setFinished] = useState<Boolean>(false);
  const [data, setData] = useState<StringOrNull>(null);

  const projectId = "2GRm23Te3cGnvxqDKLlFatNfGbI";   // <---------- your Infura Project ID

  const projectSecret = "1df4574f96fa62e9671fc4ba8d5d263b";  // <---------- your Infura Secret

  const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

  const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  });

  const onSubmit =async (err: any) => {
    err.preventDefault();

    const fileAdded = await client.add(file!);
    const url: string = `https://mustifi.infura-ipfs.io/ipfs/` + fileAdded.path;

    const metadata: metadata = {
      name: name,
      age: age,
      image: url
    }

    const result = await client.add(JSON.stringify(metadata));
    const metadataUrl = `https://mustifi.infura-ipfs.io/ipfs/` + result.path;
    setData(metadataUrl);

  }

  return (
    <div>
      <Group position="center" className={classes.root}>
        <FileInput
          placeholder="Pick file"
          label="Your image"
          withAsterisk
          value={file}
          required
          onChange={setFile}
        />
        <TextInput
          placeholder="Your name"
          label="Full name"
          withAsterisk
          required
          onChange={(value) => setName(value.currentTarget.value)}
        />
        <NumberInput
          placeholder="Your age"
          label="Your age"
          withAsterisk
          required
          onChange={(value) => setAge(value!)}
        />
      </Group>
      <Group position="center" className={classes.child}>
        <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={onSubmit}>Submit</Button>
      </Group>
      <Group position="center">
        {data? <p>{data}</p> : <p></p>}
      </Group >
    </div>
  )
}

export default Home
