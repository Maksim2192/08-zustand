"use client";

import css from "./TagsMenu.module.css";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TAGS, Tags } from "@/types/note";

const ALL_NOTES = "All Notes" as const;
type MenuTag = (typeof TAGS)[number] | typeof ALL_NOTES;

const menuTags: MenuTag[] = [ALL_NOTES, ...TAGS];

const MenuButtonLabel = ({ selectedTag }: { selectedTag: MenuTag }) => {
  return <>{selectedTag === ALL_NOTES ? "Notes" : selectedTag} ▾</>;
};

const MenuItems = ({
  menuTags,
  selectedTag,
  onTagClick,
  getFilterPath,
}: {
  menuTags: MenuTag[];
  selectedTag: MenuTag;
  onTagClick: () => void;
  getFilterPath: (tag: MenuTag) => Tags | "All";
}) => (
  <ul className={css.menuList}>
    {menuTags.map((tag) => (
      <li key={tag} className={css.menuItem}>
        <Link
          href={`/notes/filter/${getFilterPath(tag)}`}
          className={`${css.menuLink} ${selectedTag === tag ? css.active : ""}`}
          onClick={onTagClick}
        >
          {tag}
        </Link>
      </li>
    ))}
  </ul>
);

export default function TagsMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const pathParts = pathname.split("/");
  const filterIndex = pathParts.indexOf("filter");

  let currentPathTag: string | undefined;

  if (filterIndex > -1 && pathParts.length > filterIndex + 1) {
    currentPathTag = pathParts[filterIndex + 1];
  }

  let selectedTag: MenuTag = ALL_NOTES;

  if (currentPathTag === "All" || pathname === "/") {
    selectedTag = ALL_NOTES;
  } else if (currentPathTag && TAGS.includes(currentPathTag as Tags)) {
    selectedTag = currentPathTag as MenuTag;
  }

  const getFilterPath = useCallback((tag: MenuTag): Tags | "All" => {
    return tag === ALL_NOTES ? "All" : tag;
  }, []);

  const handleTagClick = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        <MenuButtonLabel selectedTag={selectedTag} />
      </button>

      {isMenuOpen && (
        <MenuItems
          menuTags={menuTags}
          selectedTag={selectedTag}
          onTagClick={handleTagClick}
          getFilterPath={getFilterPath}
        />
      )}
    </div>
  );
}