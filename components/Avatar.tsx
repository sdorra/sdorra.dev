import clsx from "clsx";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  size?: number;
  className?: string;
};

const Avatar = ({ src, alt, size = 32, className }: Props) => (
  <Image
    className={clsx("flex-shrink-0 rounded-full shadow-md ring-2 ring-base-300 dark:ring-base-700", className)}
    src={src}
    width={size}
    height={size}
    alt={alt}
  />
);

export default Avatar;
