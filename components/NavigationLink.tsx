"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  href: string;
  className?: string;
};

const NavigationLink: FC<Props> = ({ href, className, children }) => {
  const path = usePathname();
  return (
    <Link
      className={clsx(
        "underline decoration-2 hover:decoration-primary-500",
        {
          "font-semibold": path === href,
          "decoration-transparent": path !== href,
        },
        className
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
