const IMAGE_ORIGIN = "https://hyxiao-blog-images.oss-cn-shenzhen.aliyuncs.com";

export function canOptimizeImage(src: string): boolean {
  try {
    const url = new URL(src);
    // 保留矢量图、动画及带签名或处理参数的地址，避免改变原有语义。
    return url.origin === IMAGE_ORIGIN && !url.search && !url.hash &&
      /\.(jpe?g|png|webp)$/i.test(url.pathname);
  } catch {
    return false;
  }
}

export function optimizedImageUrl(src: string, width: number, quality = 80): string {
  if (!canOptimizeImage(src)) return src;
  const url = new URL(src);
  url.searchParams.set(
    "x-oss-process",
    `image/resize,w_${width},limit_1/format,webp/quality,q_${quality}`,
  );
  return url.toString();
}

export function articleImageSources(src: string) {
  if (!canOptimizeImage(src)) return {};
  return {
    src: optimizedImageUrl(src, 1440, 85),
    srcSet: [480, 768, 1080, 1440, 1920]
      .map((width) => `${optimizedImageUrl(src, width, 85)} ${width}w`)
      .join(", "),
    sizes: "(max-width: 800px) calc(100vw - 48px), 752px",
  };
}
