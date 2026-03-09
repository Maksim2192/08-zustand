import NoteForm from "@/components/NoteForm/NoteForm";
import { Metadata } from "next";
import css from "./CreateNote.module.css";

export const metadata: Metadata = {
  title: "Create Note | NoteHub",
  description: "Create a new note in NoteHub to organize your ideas, tasks and important information.",
  openGraph: {
    title: "Create Note | NoteHub",
    description: "Create a new note in NoteHub to organize your ideas, tasks and important information.",
    url: "https://notehub.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create note in NoteHub",
      },
    ],
  },
};

const CreateNotePage = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onClose={() => {}} />
      </div>
    </main>
  );
};

export default CreateNotePage;