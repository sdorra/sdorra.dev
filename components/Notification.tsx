import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  type?: "success" | "warning" | "error";
  children: ReactNode;
};

const Notification = ({ children, type = "warning" }: Props) => (
  <div
    className={clsx("not-prose rounded-md border-2 p-5 shadow-md overflow-x-scroll", {
      "border-amber-800 bg-amber-300 text-amber-900 [&>*]:text-amber-900": type === "warning",
      "border-red-800 bg-red-300 text-red-900 [&>*]:text-red-900": type === "error",
      "border-emerald-800 bg-emerald-300 text-emerald-900 [&>*]:text-emerald-900": type === "success",
    })}
  >
    {children}
  </div>
);

export default Notification;
