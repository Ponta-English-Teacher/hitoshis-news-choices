import Link from "next/link";
import { editions } from "@/data/editions";
import styles from "./page.module.css";

export const metadata = {
  title: "Previous Editions — Hitoshi's News Choices",
};

export default function EditionsPage() {
  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Back to Hitoshi&rsquo;s News Choices
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>Previous Editions</h1>
        <p className={styles.subtitle}>
          Every weekly edition of Hitoshi&rsquo;s News Choices, kept exactly as it was published.
        </p>
      </header>

      <ul className={styles.list}>
        {editions.map((edition, index) => (
          <li key={edition.date} className={styles.item}>
            <Link href={index === 0 ? "/" : `/editions/${edition.date}`} className={styles.itemLink}>
              <span className={styles.itemDate}>{edition.dateRangeLabel}</span>
              {index === 0 && <span className={styles.currentBadge}>Current edition</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
