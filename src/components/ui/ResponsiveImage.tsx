import type { ImgHTMLAttributes } from "react";
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  name: string;
  width: number;
  height: number;
};
export function ResponsiveImage({
  name,
  width,
  height,
  sizes = "(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) 50vw, 33vw",
  loading = "lazy",
  ...props
}: Props) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/${name}-640.webp 640w, /images/${name}.webp ${width}w`}
        sizes={sizes}
      />
      <img
        {...props}
        src={`/images/${name}.jpg`}
        srcSet={`/images/${name}-640.jpg 640w, /images/${name}.jpg ${width}w`}
        sizes={sizes}
        width={width}
        height={height}
        loading={loading}
      />
    </picture>
  );
}
