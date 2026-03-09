"use client";

import { QueryClient, QueryClientProvider, HydrationBoundary, useQuery } from "@tanstack/react-query";
import { DehydratedState } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

interface NoteDetailsClientProps {
  noteId: string;
  dehydratedState?: DehydratedState;
}

const queryClient = new QueryClient();

export default function NoteDetailsClient({ noteId, dehydratedState }: NoteDetailsClientProps) {
    return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
                <NoteDetailsContent noteId={noteId} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

function NoteDetailsContent({ noteId }: { noteId: string }) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !note) return <p>Error loading note</p>;
  
  const formattedDate = new Date(note.createdAt).toLocaleString();

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <p><strong>Tag:</strong> {note.tag}</p>
      <p><strong>Created At:</strong> {formattedDate}</p>
    </div>

  );
}