"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  href: string;
  activePath?: string;
  className?: string;
};

const isActive = (href: string, activePath: string | undefined, path: string) => {
  if (activePath) {
    return path.startsWith(activePath);
  }
  return path === href;
};

const NavigationLink: FC<Props> = ({ href, activePath, className, children }) => {
  const path = usePathname();
  const active = isActive(href, activePath, path);
  return (
    <Link
      className={clsx(
        "underline decoration-2 underline-offset-2 hover:decoration-primary-500",
        {
          "font-semibold": active,
          "decoration-transparent": !active,
        },
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
