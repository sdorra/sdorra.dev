import Image from "next/image";

type Props = {
  isTitle?: boolean;
};

const SiteHeading = ({ isTitle = false }: Props) => {
  const Heading = isTitle ? "h1" : "span";
  return (
    <div className="mb-5 grid grid-cols-[5rem,1fr] items-center sm:mb-10 sm:grid-cols-[7rem,1fr]">
      <Image
        className="row-span-2 h-16 w-16 rounded-full border-2 border-zinc-400 shadow-md dark:border-zinc-600 sm:h-24 sm:w-24"
        width="96"
        height="96"
        src="https://avatars.githubusercontent.com/u/493333"
        alt="Avatar of Sebastian"
      />
      <Heading className="flex h-16 items-center font-display text-5xl font-bold text-zinc-900 dark:text-zinc-50 sm:h-auto sm:text-6xl">
        sdorra<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
      </Heading>
      <p className="col-span-2 mt-2 text-xl sm:col-span-1 sm:mt-0">A site about development by Sebastian Sdorra</p>
    </div>
  );
};

export default SiteHeading;
