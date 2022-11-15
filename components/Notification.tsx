import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Notification = ({ children }: Props) => (
  <div className="not-prose rounded-md border-2 border-amber-800 bg-amber-300 p-5 text-amber-900 shadow-md [&>*]:text-amber-900">
    {children}
  </div>
);

export default Notification;
