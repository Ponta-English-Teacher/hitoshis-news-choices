import { mockNewsStories } from "@/data/mock-news-stories";
import { StoryCard } from "@/components/StoryCard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>This Week</h1>
        <p className={styles.subtitle}>
          A small selection of meaningful stories chosen for English
          learning.
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
  );
}
