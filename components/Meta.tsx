type Props = {
  title: string;
  description: string;
  url?: string;
  ogType?: "website" | "article";
  ogImage?: string;
};

const scheme = process.env.NEXT_PUBLIC_SCHEME ? process.env.NEXT_PUBLIC_SCHEME : "https";
const fqdn = process.env.NEXT_PUBLIC_FQDN ? process.env.NEXT_PUBLIC_FQDN : "sdorra.dev";

const Meta = ({ title, description, ogType = "website", url = "/", ogImage }: Props) => {
  const completeUrl = `${scheme}://${fqdn}${url}`;
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={completeUrl} />

      <meta name="description" content={description} />

      <meta property="og:url" content={completeUrl} />
      <meta property="og:type" content={ogType} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      {ogImage ? <meta property="og:image" content={`${scheme}://${fqdn}${ogImage}`} /> : null}

      <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:domain" content={fqdn} />
      <meta property="twitter:url" content={completeUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta property="twitter:image" content={`${scheme}://${fqdn}${ogImage}`} /> : null}
    </>
  );
};

export default Meta;
