import { Metadata } from "next";
import { fqdn, scheme } from "./config";

type PageType = "article" | "website";

type Config = {
  title: string;
  description: string;
  url?: string;
  type?: PageType;
  image?: string;
};



const createMetadata = ({ title, description, image, url = "/", type = "website" }: Config): Metadata => {
  return {
    // https://github.com/vercel/next.js/issues/45824
    metadataBase: new URL(`${scheme}://${fqdn}`),
    title,
    description,
    alternates: {
      // for canonical we use always the complete url
      canonical: `https://sdorra.dev${url}`,
    },
    openGraph: createOpenGraph(title, description, url, image, type),
    twitter: createTwitter(title, description, image),
  };
};


export const createOpenGraph = (
  title: string,
  description: string,
  url: string,
  image?: string,
  type: PageType = "website"
): Metadata["openGraph"] => {
  return {
    title,
    description,
    url,
    images: image
      ? [
          {
            url: image,
            width: 1200,
            height: 630,
          },
        ]
      : undefined,
    locale: "en-US",
    type,
  };
};

export const createTwitter = (title: string, description: string, image?: string): Metadata["twitter"] => {
  return {
    card: image ? "summary_large_image" : "summary",
    title,
    description,
    creator: "@ssdorra",
    creatorId: "777421783",
    images: image,
  };
};

export default createMetadata;
