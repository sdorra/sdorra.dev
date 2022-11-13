import { FC, PropsWithChildren } from "react";

const PageTitle: FC<PropsWithChildren> = ({children}) => (
  <h1 className="text-4xl font-bold mb-10">{children}</h1>
);

export default PageTitle;
