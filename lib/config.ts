export const scheme = process.env.NEXT_PUBLIC_SCHEME ? process.env.NEXT_PUBLIC_SCHEME : "https";
export const fqdn = process.env.NEXT_PUBLIC_FQDN ? process.env.NEXT_PUBLIC_FQDN : "sdorra.dev";
export const baseUrl = `${scheme}://${fqdn}`;

export const createCompleteUrl = (path: string) => {
  if (path.startsWith("/")) {
    return `${baseUrl}${path}`;
  }
  return `${baseUrl}/${path}`;
};
