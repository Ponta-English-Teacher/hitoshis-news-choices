import Link from "next/link";
import { latestEdition } from "@/data/editions";
import { StoryCard } from "@/components/StoryCard";
import { SelectionToolsProvider } from "@/components/selection-tools/SelectionToolsProvider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <SelectionToolsProvider>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Hitoshi’s News Choices</h1>
          <p className={styles.dateRange}>{latestEdition.dateRangeLabel}</p>
          <p className={styles.subtitle}>
            Meaningful stories selected for English learning.
          </p>
          <div className={styles.links}>
            <Link href="/editions" className={styles.editionsLink}>
              Previous editions →
            </Link>
            <a
              href="/Hitoshis_News_Choices_User_Guide_Bilingual.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.editionsLink}
            >
              User Guide / ユーザーガイド →
            </a>
          </div>
        </header>

        <section
          className={styles.grid}
          aria-label="This week's selected stories"
        >
          {latestEdition.stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      </div>
    </SelectionToolsProvider>
  );
}
