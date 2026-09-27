"use client";

import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  src: string;
  className?: string;
}

/** Product thumbnail with a neutral fallback if the file fails to load. */
export function ProductImage({ src, className = "" }: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-sand text-subtle ${className}`}>
        <ImageOff className="size-5" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={480}
      height={360}
      className={`object-cover ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
