"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/lib/uploadthing";

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
    <UploadButton<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={onClientUploadComplete}
      onUploadError={onUploadError}
      className={className}
    />
  );
}
  )
}