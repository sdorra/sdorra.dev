import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  severity?: "warning" | "error";
  children: ReactNode;
};

const Notification = ({ children, severity = "warning" }: Props) => (
  <div
    className={clsx("not-prose rounded-md border-2 p-5 shadow-md", {
      "border-amber-800 bg-amber-300 text-amber-900 [&>*]:text-amber-900": severity === "warning",
      "border-red-800 bg-red-300 text-red-900 [&>*]:text-red-900": severity === "error",
    })}
  >
    {children}
  </div>
);

export default Notification;
