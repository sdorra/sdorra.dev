"use client";

import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Check, Copy, Facebook, Linkedin, Mail, Pocket, Share2, Twitter, XCircle } from "lucide-react";
import { Fragment, ReactNode, useState } from "react";
import { IconButton, IconExternalLink } from "./icons";

type Props = {
  title: string;
  text?: string;
  url: string;
  className?: string;
};

const isWebShareSupported = (data: ShareData) => {
  // @ts-ignore we prefer to check if the api is really available
  return window.navigator.canShare && window.navigator.share && window.navigator.canShare(data);
};

type ShareIconProps = {
  url: string;
  title: string;
  children?: ReactNode;
};

const ShareIcon = ({ title, url, children }: ShareIconProps) => (
  <li>
    <IconExternalLink title={title} href={url} className="block hover:text-zinc-800 dark:hover:text-zinc-200">
      {children}
    </IconExternalLink>
  </li>
);

const fqdn = process.env.NEXT_PUBLIC_FQDN ? process.env.NEXT_PUBLIC_FQDN : "sdorra.dev";

const CopyButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    setCopied(true);
    window.navigator.clipboard.writeText(url);
  };

  return (
    <li>
      <IconButton title="Copy url to clipboard" onClick={copy} className="hover:text-zinc-800 dark:hover:text-zinc-200">
        {copied ? <Check /> : <Copy />}
      </IconButton>
    </li>
  );
};

const ShareButton = ({ title, text, url, className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = async () => {
    const data = {
      title,
      text,
      url: url + "?utm_campaign=social-sharing&utm_source=btn&utm_medium=native",
    };
    if (isWebShareSupported(data)) {
      await window.navigator.share(data);
    } else {
      setIsOpen(true);
    }
  };

  const completeUrl = `https://${fqdn}${url}?utm_campaign=social-sharing&utm_source=btn&utm_medium=`;

  return (
    <>
      <button onClick={onClick} className={clsx("group flex items-center gap-1", className)}>
        <Share2 className="h-5 w-5 group-hover:stroke-[3px]" />
        <span className="underline group-hover:decoration-cyan-500 group-hover:decoration-2">share</span>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-700 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    Share post
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 text-zinc-700 dark:text-zinc-300">{title}</Dialog.Description>

                  <ul className="mt-6 flex justify-around gap-2 text-zinc-500 dark:text-zinc-400">
                    <ShareIcon
                      title="Add to Pocket"
                      url={`https://getpocket.com/save?url=${encodeURIComponent(completeUrl + "pocket")}`}
                    >
                      <Pocket />
                    </ShareIcon>
                    <ShareIcon
                      title="Share on Twitter"
                      url={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        completeUrl + "twitter"
                      )}&text=${encodeURIComponent(title)}`}
                    >
                      <Twitter />
                    </ShareIcon>
                    <ShareIcon
                      title="Share on Facebook"
                      url={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(completeUrl + "facebook")}`}
                    >
                      <Facebook />
                    </ShareIcon>
                    <ShareIcon
                      title="Share on LinkedIn"
                      url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(completeUrl + "linkedin")}`}
                    >
                      <Linkedin />
                    </ShareIcon>
                    <ShareIcon
                      title="Send by e-mail"
                      url={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
                        text + "\n\n"
                      )}${encodeURIComponent(completeUrl + "email")}`}
                    >
                      <Mail />
                    </ShareIcon>
                    <CopyButton url={completeUrl + "copy"} />
                  </ul>
                  <button className="group absolute top-4 right-4" aria-label="Close" onClick={() => setIsOpen(false)}>
                    <XCircle className="text-zinc-400 group-hover:stroke-[3px] group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareButton;
