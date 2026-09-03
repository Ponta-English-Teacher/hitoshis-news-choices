"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./EditionsSidebar.module.css";

interface EditionSummary {
  date: string;
  dateRangeLabel: string;
}

/**
 * A native <details>/<summary> disclosure, always rendered the same way
 * regardless of viewport — no client-side viewport detection, no JS state.
 * Renders `open` by default: a browser only lays out a <details>'s content
 * while it's actually open (Chrome skips layout entirely for collapsed
 * content — overriding `display` on the children alone does not undo
 * that), so "open" is the only way to guarantee the list renders at all.
 * On mobile this is still a genuine, native collapsible control — tapping
 * the summary closes it, same as any <details>. On desktop,
 * EditionsSidebar.module.css neutralizes the summary's toggle affordance
 * (pointer-events: none) so it reads as a plain, always-visible, sticky
 * sidebar there instead. Only receives the lightweight
 * {date, dateRangeLabel} list (not full story content), to keep this
 * client bundle small — the caller (a Server Component) is responsible for
 * narrowing the full `editions` data down to that shape.
 */
export function EditionsSidebar({ editions }: { editions: EditionSummary[] }) {
  const pathname = usePathname();
  const latestDate = editions[0]?.date;
  const selectedDate = pathname === "/editions" ? latestDate : pathname.replace(/^\/editions\/?/, "");

  return (
    <details className={styles.disclosure} open>
      <summary className={styles.summary}>Previous Editions</summary>
      <nav aria-label="Previous editions" className={styles.nav}>
        <ul className={styles.list}>
          {editions.map((edition, index) => {
            const isSelected = edition.date === selectedDate;
            const href = index === 0 ? "/editions" : `/editions/${edition.date}`;
            return (
              <li key={edition.date}>
                <Link
                  href={href}
                  className={isSelected ? `${styles.item} ${styles.itemSelected}` : styles.item}
                  aria-current={isSelected ? "page" : undefined}
                >
                  <span className={styles.itemDate}>{edition.dateRangeLabel}</span>
                  {index === 0 ? <span className={styles.currentBadge}>Current edition</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </details>
  );
}
