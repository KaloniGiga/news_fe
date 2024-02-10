import { Box, Button, Group, SimpleGrid, Text, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IconDownload, IconX, IconCloudUpload } from "@tabler/icons-react";
import Image from "next/image";
import React, { FunctionComponent, useRef, useState } from "react";

interface IDropzone {
  onChange: (value: any) => void;
  value: string;
}
const DropSingleFile: FunctionComponent<IDropzone> = ({ onChange, value }) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const [image, setImage] = useState("");
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  const onDrop = (files: FileWithPath[]) => {
    console.log(files);
    onChange(files[0]);
    setFile(files[0]);
  };

  const previews = () => {
    if (file) {
      console.log("file");
      const imageUrl = URL.createObjectURL(file);
      return <Image alt="" width={200} height={200} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    } else {
      return <div></div>;
    }
  };
  return (
    <div className="relative mb-2">
      <Dropzone openRef={openRef} onDrop={onDrop} radius={"md"} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE}>
        <Group justify="center">
          <Dropzone.Accept>
            <IconDownload style={{ width: rem(30), height: rem(30) }} color={theme.colors.blue[6]} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX style={{ width: rem(30), height: rem(30) }} color={theme.colors.red[6]} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconCloudUpload style={{ width: rem(30), height: rem(30) }} stroke={1.5} />
          </Dropzone.Idle>
        </Group>

        <Text ta="center" fw={700} fz="lg" mt="xl">
          <Dropzone.Accept>Drop files here</Dropzone.Accept>
          <Dropzone.Reject>Image file less than 10mb</Dropzone.Reject>
          <Dropzone.Idle>Upload Avatar</Dropzone.Idle>
        </Text>
        <Text ta="center" fz="sm" mt="xs" mb="lg" c="dimmed">
          Drag&apos;n&apos;drop files here to upload. We can accept only <i>.png, .jpg, .webp, .avif</i> files that are
          less than 10mb in size.
        </Text>
      </Dropzone>

      {/* <Button className="absolute left-[40%] bottom-5" size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button> */}
      <Group component="div" w={"100%"} justify="center" mt={previews.length > 0 ? "xl" : 0}>
        {previews()}
      </Group>
    </div>
  );
};

export default DropSingleFile;
