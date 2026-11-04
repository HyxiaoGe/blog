"use client";

import Image, { type ImageLoaderProps } from "next/image";
import { canOptimizeImage, optimizedImageUrl } from "@/lib/image-delivery";

function ossLoader({ src, width, quality }: ImageLoaderProps) {
  return optimizedImageUrl(src, width, quality ?? 80);
}

export function PostCover({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      fill
      sizes="(max-width: 640px) calc(100vw - 48px), 210px"
      loader={canOptimizeImage(src) ? ossLoader : undefined}
      unoptimized={src.endsWith(".svg")}
      className="post-card-cover-image"
    />
  );
}
