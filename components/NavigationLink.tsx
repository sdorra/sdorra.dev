"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  href: string;
};

const NavigationLink: FC<Props> = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link className={clsx({ "font-semibold underline decoration-2": path === href })} href={href}>
      {children}
    </Link>
  );
};

export default NavigationLink;
