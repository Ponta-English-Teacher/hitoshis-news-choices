import { StoryCard } from "@/components/StoryCard";
import type { EditionMeta } from "@/data/editions";
import styles from "@/app/page.module.css";

/**
 * The header + six-StoryCard grid shared by /editions (latest edition) and
 * /editions/[date] (an archived edition) — same markup shape as the
 * homepage, reusing its page.module.css classes rather than a new
 * stylesheet, so archived editions keep the exact same card design.
 */
export function EditionStories({ edition, subtitle }: { edition: EditionMeta; subtitle?: string }) {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Hitoshi&rsquo;s News Choices</h1>
        <p className={styles.dateRange}>{edition.dateRangeLabel}</p>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </header>

      <section className={styles.grid} aria-label={`Stories from ${edition.dateRangeLabel}`}>
        {edition.stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </section>
    </>
  );
}
