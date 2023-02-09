import Image from "next/image";

// TODO h1 -> h2

const SiteHeading = () => (
  <div className="mb-5 sm:mb-10">
    <div className="mb-2 flex items-center gap-4">
      <Image
        className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-zinc-400 shadow-md dark:border-zinc-600 sm:h-24 sm:w-24"
        width="96"
        height="96"
        src="https://avatars.githubusercontent.com/u/493333"
        alt="Avatar of Sebastian"
      />
      <div>
        <h1 className="mb-2 text-5xl font-bold sm:text-6xl">
          sdorra<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
        </h1>
        <p className="hidden text-xl sm:block">A site about development by Sebastian Sdorra</p>
      </div>
    </div>
    <p className="text-xl sm:hidden">A site about development by Sebastian Sdorra</p>
  </div>
);

export default SiteHeading;
