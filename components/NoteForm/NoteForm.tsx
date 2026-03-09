"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { Note } from "@/types/note";
import { useNoteDraftStore } from "@/lib/store/noteStore";

type NoteFormProps = {
  onClose: () => void;
};

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: (noteData: Omit<Note, "id" | "createdAt" | "updatedAt">) =>
      createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose();
    },
  });

  const handleSubmit = async () => {
    const noteData: Omit<Note, "id" | "createdAt" | "updatedAt"> = {
      title: draft.title,
      content: draft.content,
      tag: draft.tag as Note["tag"],
    };
    mutation.mutate(noteData);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          className={css.input}
          required
          minLength={3}
          maxLength={50}
          value={draft.title}
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          maxLength={500}
          value={draft.content}
          onChange={(e) =>
          setDraft({
      ...draft,
      tag: e.target.value as Note["tag"],
    })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          required
          value={draft.tag}
          onChange={(e) => setDraft({ ...draft, tag: e.target.value as Note["tag"] })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;