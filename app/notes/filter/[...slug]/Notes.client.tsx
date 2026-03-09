"use client";

import css from "./NotesPage.module.css";
import { useState, useCallback } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import SearchBox from "@/components/SearchBox/SearchBox";
import { NoteList } from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";
import type { Tags } from "@/types/note";

interface NotesClientProps {
  tag: Tags | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
 const [currentPage, setCurrentPage] = useState(0);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(localSearchQuery, 500);

  const { data, error, isLoading } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", currentPage, debouncedQuery, tag],
    queryFn: () => fetchNotes(debouncedQuery, currentPage + 1, tag),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  if (error) {
    throw error;
  }

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback(
    (value: string) => {
      const lowerCaseValue = value.toLowerCase();
      if (lowerCaseValue !== localSearchQuery) {
        setCurrentPage(1);
        setLocalSearchQuery(lowerCaseValue);
      }
    },
    [localSearchQuery]
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={localSearchQuery} onChange={handleSearchChange} />

        {data && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading ? (
        <p>Loading...</p>
      ) : data?.notes && data.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        <p>Nothing found</p>
      )}
    </div>
  );
}