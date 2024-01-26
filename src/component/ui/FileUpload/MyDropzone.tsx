import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import BackupIcon from "@mui/icons-material/Backup";
import Image from "next/image";

interface IDropzone {
  onChange: (value: any) => void;
  value: string;
  isEdit: boolean;
}
const DropzoneComponent: FunctionComponent<IDropzone> = ({ isEdit, onChange, value }) => {
  const [files, setFiles] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    onChange(acceptedFiles[0]);
    const targetFile = acceptedFiles[0];
    Object.assign(targetFile, {
      preview: URL.createObjectURL(targetFile),
    });
    setFiles(targetFile);
  }, []);

  useEffect(() => {
    if (isEdit) {
      setFiles(value);
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      className="w-full px-2 py-2 flex flex-col justify-center items-center bg-[#f5f5f5] m-4 border-[1px] border-[rgba(0,0,0,0.1)] rounded-lg"
    >
      <input {...getInputProps()} />
      <p className="w-full mt-2 font-semibold text-center">Drag and drop your files here, or click to select files</p>
      <div className="w-full flex justify-center items-center py-4">
        <BackupIcon sx={{ color: "#239BE5" }} fontSize="large" />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {files && (
          <div className="w-[200px]">
            <Image
              alt=""
              width={1000}
              height={2000}
              src={files.preview}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DropzoneComponent;
