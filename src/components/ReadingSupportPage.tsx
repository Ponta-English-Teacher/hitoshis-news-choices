import Image from "next/image";
import Link from "next/link";
import type { NewsStory, ReadingSupport } from "@/types/news-story";
import styles from "./ReadingSupportPage.module.css";

export function ReadingSupportPage({
  story,
  readingSupport,
}: {
  story: NewsStory;
  readingSupport: ReadingSupport;
}) {
  return (
    <div className={`${styles.page} ${styles.compact}`}>
      <Link href="/" className={styles.back}>
        ← Back to Hitoshi&rsquo;s News Choices
      </Link>

      <article className={styles.headerCard}>
        <div className={styles.imageWrap}>
          <Image
            src={story.imageUrl}
            alt={story.imageAlt}
            fill
            sizes="(max-width: 700px) 100vw, 700px"
            className={styles.image}
          />
        </div>
        <div className={styles.headerContent}>
          <p className={styles.category}>{story.category}</p>
          <h1 className={styles.headline}>{story.headline}</h1>
          <p className={styles.meta}>
            {story.sourceName} · {story.category} · {story.estimatedLevel} ·
            About {story.estimatedReadingMinutes} min · {story.publicationDate}
          </p>
        </div>
      </article>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Before You Read</h2>
        <h3 className={styles.subheading}>Background</h3>
        <p className={styles.background}>{readingSupport.background}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Key English</h2>
        <dl className={styles.vocabList}>
          {readingSupport.vocabulary.map((item) => (
            <div key={item.term} className={styles.vocabItem}>
              <dt className={styles.vocabTerm}>{item.term}</dt>
              <dd className={styles.vocabMeaning}>{item.meaning}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>What to Notice While Reading</h2>
        <p className={styles.promptsIntro}>
          A few things to think about as you read &mdash; not a quiz.
        </p>
        <ul className={styles.promptList}>
          {readingSupport.readingPrompts.map((prompt) => (
            <li key={prompt} className={styles.promptItem}>
              {prompt}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Authentic Article</h2>
        <p className={styles.promptsIntro}>
          Now read the original reporting on {story.sourceName}.
        </p>
        <a
          href={story.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryAction}
        >
          Open Reuters Article →
        </a>
      </section>
    </div>
  );
}
