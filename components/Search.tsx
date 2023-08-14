"use client";

import { Dialog, Transition } from "@headlessui/react";
import useSearch from "lib/useSearch";
import { Loader2, SearchCode, XCircle } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { IconButton } from "./icons";
import PostCard from "./PostCard";

type SearchModalProps = {
  isOpen: boolean;
  close: () => void;
};

const SearchModal = ({ isOpen, close }: SearchModalProps) => {
  const { query, search, isLoading, result } = useSearch();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-base-700">
                <Dialog.Title as="h3" className="text-xl font-bold text-base-900 dark:text-base-50">
                  Search Post
                </Dialog.Title>
                <label htmlFor="query" className="relative">
                  <input
                    id="query"
                    type="text"
                    className="mt-4 w-full rounded-md border-2 border-base-300 p-2 focus:border-primary-300 focus:ring-primary-300 dark:border-base-500 dark:bg-base-600 dark:text-base-300 dark:placeholder-base-400 dark:focus:border-primary-400 dark:focus:ring-primary-400"
                    placeholder="Search for a post"
                    value={query}
                    onChange={(e) => search(e.target.value)}
                  />
                  <span className="pointer-events-none absolute -top-0.5 right-1.5 text-base-400">
                    {isLoading ? <Loader2 className="animate-spin" /> : <SearchCode />}
                  </span>
                </label>
                <div className="mt-4" onClick={close}>
                  {result.map((post) => (
                    <PostCard key={post.url} post={post} />
                  ))}
                </div>

                <button className="group absolute right-4 top-4" aria-label="Close" onClick={close}>
                  <XCircle className="text-base-400 group-hover:stroke-[3px] group-hover:text-base-700 dark:group-hover:text-base-200" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        setIsOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <SearchModal isOpen={isOpen} close={() => setIsOpen(false)} />
      <IconButton onClick={() => setIsOpen(true)} title="Search for a post (press '/')">
        <SearchCode />
      </IconButton>
    </>
  );
};

export default Search;
