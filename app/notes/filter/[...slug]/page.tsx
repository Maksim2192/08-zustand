import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { TAGS, Tags } from "@/types/note";
import NotesClient from "./Notes.client";

interface NotesSlugProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata(
  { params }: NotesSlugProps
): Promise<Metadata> {
  const { slug } = await params;

  const currentSlug = slug?.[0] || "All";

  const title = `Notes filtered by ${currentSlug} | NoteHub`;
  const description = `Browse notes filtered by ${currentSlug} tag in the NoteHub application.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/filter/${currentSlug}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub filtered notes preview",
        },
      ],
    },
  };
}

export default async function NotesSlugPage({ params }: NotesSlugProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  let tag: Tags | undefined = undefined;
  const currentSlug = slug[0];

  if (currentSlug) {
    if (TAGS.includes(currentSlug as Tags)) {
      tag = currentSlug as Tags;
    } else if (currentSlug === "All") {
      tag = undefined;
    }
  }

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}