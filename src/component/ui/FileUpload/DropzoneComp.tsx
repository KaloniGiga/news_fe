"use client";
import { Group, SimpleGrid, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";

interface IDropzone {
  onChange: (value: any) => void;
  value: string;
  isEdit: boolean;
}
const DropzoneComp: FunctionComponent<IDropzone> = ({ isEdit, onChange, value }) => {
  const [file, setFile] = useState<FileWithPath | null>(null);

  const onDrop = (files: FileWithPath[]) => {
    console.log(files);
    onChange(files[0]);
    setFile(files[0]);
  };

  const previews = () => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      return <Image alt="" width={200} height={200} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    } else {
      return <div></div>;
    }
  };

  useEffect(() => {
    if (isEdit) {
      //   setFile(value);
    }
  }, [isEdit, value]);

  return (
    <div className="pb-2">
      <Dropzone onDrop={onDrop} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE}>
        <Group justify="center" gap={"xl"} mih={200} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload style={{ width: rem(52), height: rem(52), color: "#1C7ED6" }} stroke={1.5} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX style={{ width: rem(52), height: rem(52), color: "#1C7ED6" }} stroke={1.5} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto style={{ width: rem(52), height: rem(52), color: "#1C7ED6" }} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Attach as many files as you like, each file should not exceed 5mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? "xl" : 0}>
        {previews()}
      </SimpleGrid>
    </div>
  );
};

export default DropzoneComp;
