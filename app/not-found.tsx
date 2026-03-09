import type { Metadata } from "next";
import css from "./error.module.css";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "This page does not exist. The requested page could not be found.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "This page does not exist. The requested page could not be found.",
    url: "https://notehub.app/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 page preview",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.error}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}