import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(BASE_URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      search: search || undefined,
      page,
      tag: tag || undefined,
    },
  });

  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">
): Promise<Note> => {
  const res = await axios.post<Note>(BASE_URL, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};

export const updateNote = async (
  id: string,
  note: Partial<Omit<Note, "id" | "createdAt" | "updatedAt">>
): Promise<Note> => {
  const res = await axios.patch<Note>(`${BASE_URL}/${id}`, note, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return res.data;
};