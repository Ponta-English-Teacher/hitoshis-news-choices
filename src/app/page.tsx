import { mockNewsStories } from "@/data/mock-news-stories";
import { StoryCard } from "@/components/StoryCard";
import { SelectionToolsProvider } from "@/components/selection-tools/SelectionToolsProvider";
import styles from "./page.module.css";

export default function Home() {
  return (
    <SelectionToolsProvider>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Hitoshi’s News Choices</h1>
          <p className={styles.dateRange}>August 31 – September 1, 2026</p>
          <p className={styles.subtitle}>
            Meaningful stories selected for English learning.
          </p>
        </header>

        <section
          className={styles.grid}
          aria-label="This week's selected stories"
        >
          {mockNewsStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      </div>
    </SelectionToolsProvider>
  );
}
