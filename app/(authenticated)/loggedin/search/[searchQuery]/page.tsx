"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAction } from "convex/react";

import MobileNav from "@/components/nav/MobileNav";
import Sidebar from "@/components/nav/Sidebar";
import Todos from "@/components/todos/Todos";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

const SearchResults = () => {
  const { searchQuery } = useParams<{ searchQuery: string }>();

  const [searchResults, setSearchResults] = useState<Doc<"todos">[]>([]);
  const [searchInProgress, setSearchInProgress] = useState(false);

  const vectorSearch = useAction(api.queries.search.searchTasks);

  console.log({ searchQuery });

  useEffect(() => {
    const handleSearch = async () => {
      setSearchResults([]);

      setSearchInProgress(true);
      try {
        const results = await vectorSearch({
          query: searchQuery,
        });

        setSearchResults(results);
      } finally {
        setSearchInProgress(false);
      }
    };

    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, vectorSearch]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <MobileNav />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:px-8">
          <div className="xl:px-40">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-semibold md:text-2xl">
                Search Results for{" "}
                <span>
                  {`"`}
                  {decodeURI(searchQuery)}
                  {`"`}
                </span>
              </h1>
            </div>

            <div className="flex flex-col gap-1 py-4">
              {searchInProgress && searchResults.length > 0 ? (
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
              ) : (
                <Todos
                  items={searchResults.filter(
                    (item) => item.isCompleted === false
                  )}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
