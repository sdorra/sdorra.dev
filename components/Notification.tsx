import clsx from "clsx";
import { AlertTriangle, CheckCircle, Lightbulb, XOctagon } from "lucide-react";
import { ReactNode } from "react";

type Type = "info" | "success" | "warning" | "error";

type Props = {
  type?: Type;
  children: ReactNode;
};

const icons = {
  info: Lightbulb,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XOctagon,
};

const Notification = ({ children, type = "warning" }: Props) => {
  const Icon = icons[type];
  return (
    <div
      className={clsx(
        "not-prose relative overflow-x-scroll rounded-md border-2 p-5 shadow-md [&_a]:underline [&_a]:hover:decoration-2",
        {
          "border-sky-800 bg-sky-300 text-sky-900 [&>*:not(svg)]:text-sky-900": type === "info",
          "border-amber-800 bg-amber-300 text-amber-900 [&>*:not(svg)]:text-amber-900": type === "warning",
          "border-red-800 bg-red-300 text-red-900 [&>*:not(svg)]:text-red-900": type === "error",
          "border-emerald-800 bg-emerald-300 text-emerald-900 [&>*:not(svg)]:text-emerald-900": type === "success",
        }
      )}
    >
      {children}
      <Icon
        size={"1.25rem"}
        className={clsx("absolute right-1 top-1 text-xs", {
          "text-sky-700": type === "info",
          "text-amber-700": type === "warning",
          "text-red-700": type === "error",
          "text-emerald-700": type === "success",
        })}
      />
    </div>
  );
};

export default Notification;
