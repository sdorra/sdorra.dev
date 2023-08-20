import clsx from "clsx";
import Link from "next/link";

type HrefFactory = (page: number) => string;

type ItemProps = {
  page: number;
  active: boolean;
  hrefFactory: HrefFactory;
};

const Item = ({ page, active, hrefFactory }: ItemProps) => {
  const baseClass = clsx("flex select-none h-10 w-10 items-center justify-center rounded-full border-2", {
    "dark:border-stone-600": !active,
    "border-stone-500 dark:border-stone-300 font-bold": active,
  });

  if (active) {
    return (
      <span aria-current className={baseClass}>
        {page + 1}
      </span>
    );
  }

  return (
    <Link
      className={clsx(baseClass, "hover:border-primary-500 hover:font-bold dark:hover:border-primary-500")}
      href={hrefFactory(page + 1)}
    >
      {page + 1}
    </Link>
  );
};

type Props = {
  page: number;
  pages: unknown[][];
  hrefFactory: HrefFactory;
  className?: string;
};

const Pager = ({ page, pages, hrefFactory, className }: Props) => {
  return (
    <nav className={className}>
      <ul className="flex justify-center gap-3">
        {pages.map((_, p) => (
          <li key={p}>
            <Item hrefFactory={hrefFactory} page={p} active={p === page} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pager;
