import { useState } from "react";
import { FileButton, Button, Group, Text, FileInput, Stack } from "@mantine/core";

const UploadAvatar = () => {
  const [file, setFile] = useState<File | null>(null);
  return (
    <>
      <Stack>
        <Text size="md">Profile Image</Text>
        <Group>
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {props => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Group>

        {file && (
          <Text size="sm" ta="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )}
      </Stack>
    </>
  );
};

export default UploadAvatar;
