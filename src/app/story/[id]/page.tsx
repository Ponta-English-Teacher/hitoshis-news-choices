import { notFound } from "next/navigation";
import Link from "next/link";
import { mockNewsStories } from "@/data/mock-news-stories";
import styles from "./page.module.css";

export default async function StoryPage({
  params,
}: PageProps<"/story/[id]">) {
  const { id } = await params;
  const story = mockNewsStories.find((candidate) => candidate.id === id);

  if (!story) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.back}>
        ← Back to This Week
      </Link>

      <article className={styles.card}>
        <h1 className={styles.headline}>{story.headline}</h1>
        <p className={styles.meta}>
          {story.sourceName} · {story.estimatedLevel} · About{" "}
          {story.estimatedReadingMinutes} min
        </p>
        <p className={styles.placeholder}>
          Interactive Reading will be available here.
        </p>
      </article>
    </div>
  );
}
