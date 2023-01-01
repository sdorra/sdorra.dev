import { Paragraph } from "mdast";

export type Provider = {
  baseUrl: string;
  transform: (node: Paragraph, url: string) => Promise<void> | null;
};
