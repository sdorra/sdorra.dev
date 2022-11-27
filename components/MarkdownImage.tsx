import Image from "next/image";

type Props = {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
};

const MarkdownImage = ({ src, alt, width, height }: Props) => {
  if (!src || !alt) {
    throw new Error("src and alt is required");
  }
  return <Image src={src} alt={alt} width={Number(width)} height={Number(height)} className="rounded-md shadow-md" />;
};

export default MarkdownImage;
