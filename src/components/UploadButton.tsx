"use client";

import { UploadButton as UTUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface UploadButtonProps {
  endpoint: keyof OurFileRouter;
  onClientUploadComplete?: (res: any) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
}

export default function CustomUploadButton({
  endpoint,
  onClientUploadComplete,
  onUploadError,
  className
}: UploadButtonProps) {
  return (
    <UTUploadButton<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      className={className}
    />
  );
}
}