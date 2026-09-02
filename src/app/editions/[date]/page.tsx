import { notFound } from "next/navigation";
import Link from "next/link";
import { findEditionByDate } from "@/data/editions";
import { StoryCard } from "@/components/StoryCard";
import { SelectionToolsProvider } from "@/components/selection-tools/SelectionToolsProvider";
import styles from "@/app/page.module.css";

export default async function EditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const edition = findEditionByDate(date);

  if (!edition) {
    notFound();
  }

  return (
    <SelectionToolsProvider>
      <div className={styles.page}>
        <Link href="/editions" className={styles.back}>
          ← Back to Previous Editions
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>Hitoshi&rsquo;s News Choices</h1>
          <p className={styles.dateRange}>{edition.dateRangeLabel}</p>
          <p className={styles.subtitle}>Archived edition.</p>
        </header>

        <section className={styles.grid} aria-label={`Stories from ${edition.dateRangeLabel}`}>
          {edition.stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </section>
      </div>
    </SelectionToolsProvider>
  );
}
