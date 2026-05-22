import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { PostOverview } from "./types";

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState<PostOverview[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const [isLoading, setIsLoading] = useState(false);
  const result = debouncedQuery.length > 0 ? matches : [];

  useEffect(() => {
    let abortController: AbortController | null = null;
    const search = async () => {
      setIsLoading(true);
      try {
        abortController = new AbortController();
        const response = await fetch(`/posts/search?query=${debouncedQuery}`, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          throw new Error("failed to search");
        }
        const json = await response.json();
        setMatches(json);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedQuery.length > 0) {
      search();
    }

    return () => {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [debouncedQuery]);

  return {
    query,
    result,
    search: setQuery,
    isLoading,
  };
};

export default useSearch;
