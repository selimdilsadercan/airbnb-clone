"use client";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";

interface Props {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  value: string;
}

const FileUpload = ({ onChange, endpoint, value }: Props) => {
  if (value) {
    return (
      <div className="relative items-center justify-center h-32 gap-4 p-20 transition">
        <div className="absolute inset-0 w-full h-32 ">
          <Image fill style={{ objectFit: "cover" }} src={value} alt="House" />
        </div>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(`[UPLOAD ${endpoint}]`, error);
        toast.error("Upload failed");
      }}
    />
  );
};

export default FileUpload;
