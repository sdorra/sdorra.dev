import clsx from "clsx";
import { AlertTriangle, CheckCircle, Lightbulb, XOctagon } from "lucide-react";
import { ReactNode } from "react";

export const types = ["info", "success", "warning", "error"] as const;

type Type = typeof types[number];

type Props = {
  type?: Type;
  title?: string;
  children: ReactNode;
  prose?: boolean;
};

const icons = {
  info: Lightbulb,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XOctagon,
};

const Notification = ({ title, children, type = "warning", prose = false}: Props) => {
  const Icon = icons[type];
  return (
    <div
      className={clsx(
        "rounded-md border-l-8 border-r border-t border-b p-5 shadow-md [&_a]:underline hover:[&_a]:decoration-2",
        {
          "border-sky-600 dark:border-sky-500 hover:[&_a]:decoration-sky-500": type === "info",
          "border-amber-600 dark:border-amber-500 hover:[&_a]:decoration-amber-500": type === "warning",
          "border-red-600 dark:border-red-500 hover:[&_a]:decoration-red-500": type === "error",
          "border-emerald-600 dark:border-emerald-500 hover:[&_a]:decoration-emerald-500": type === "success",
          "not-prose": !prose
        }
      )}
    >
      <div
        className={clsx("mb-2 flex items-center justify-between", {
          "text-sky-700 dark:text-sky-500": type === "info",
          "text-amber-700 dark:text-amber-500": type === "warning",
          "text-red-600 dark:text-red-500": type === "error",
          "text-emerald-700 dark:text-emerald-500": type === "success",
        })}
      >
        <div className="font-semibold first-letter:uppercase">{title ? title : type}</div>
        <Icon />
      </div>
      {children}
    </div>
  );
};

export default Notification;
