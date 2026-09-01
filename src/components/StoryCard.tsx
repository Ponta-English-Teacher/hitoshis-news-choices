import Image from "next/image";
import Link from "next/link";
import type { NewsStory } from "@/types/news-story";
import styles from "./StoryCard.module.css";

export function StoryCard({ story }: { story: NewsStory }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          src={story.imageUrl}
          alt={story.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, 520px"
          className={styles.image}
        />
        {story.imageSourceType === "ai-generated" && (
          <span className={styles.aiImageBadge}>AI-generated illustration</span>
        )}
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{story.category}</p>

        <h2 className={styles.headline}>{story.headline}</h2>
        <p className={styles.meta}>
          {story.sourceName} · {story.estimatedLevel} · About{" "}
          {story.estimatedReadingMinutes} min
        </p>

        <div className={styles.indicators}>
          <div className={styles.indicator}>
            <span className={styles.indicatorScore}>
              🔥 {story.trendingScore}/5
            </span>
            <span className={styles.indicatorLabel}>Trending</span>
          </div>
          <div className={styles.indicator}>
            <span className={styles.indicatorScore}>
              ★ {story.significanceScore}/5
            </span>
            <span className={styles.indicatorLabel}>Significance</span>
          </div>
          <div className={styles.indicator}>
            <span className={styles.indicatorScore}>
              💬 {story.discussionValueScore}/5
            </span>
            <span className={styles.indicatorLabel}>Discussion</span>
          </div>
          <div className={styles.indicator}>
            <span className={styles.indicatorScore}>
              🧠 {story.knowledgeValueScore}/5
            </span>
            <span className={styles.indicatorLabel}>Knowledge</span>
          </div>
        </div>

        <div className={styles.whyBox}>
          <p className={styles.whyLabel}>Why Read This?</p>
          <p className={styles.whyText}>{story.whyWeChoseThis}</p>
        </div>

        <div className={styles.vocab}>
          <p className={styles.vocabLabel}>Key English</p>
          <p className={styles.vocabList}>{story.keyVocabulary.join(" · ")}</p>
        </div>

        <div className={styles.footer}>
          {story.readingMode === "authentic" && story.readingSupport ? (
            <Link href={`/story/${story.id}`} className={styles.action}>
              Reading Support →
            </Link>
          ) : story.readingMode === "authentic" ? (
            <a
              href={story.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.action}
            >
              Read the Original →
            </a>
          ) : (
            <Link href={`/story/${story.id}`} className={styles.action}>
              Interactive Reading
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
