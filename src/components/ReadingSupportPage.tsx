"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsStory, ReadingSupport } from "@/types/news-story";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
import { SelectionToolsProvider } from "@/components/selection-tools/SelectionToolsProvider";
import { SelectableRegion } from "@/components/selection-tools/SelectableRegion";
import styles from "./ReadingSupportPage.module.css";

interface ChatTurn {
  question: string;
  answer: string;
}

export function ReadingSupportPage({
  story,
  readingSupport,
}: {
  story: NewsStory;
  readingSupport: ReadingSupport;
}) {
  const isComposingRef = useRef(false);

  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  async function handleSendChatMessage() {
    const question = chatInput.trim();
    if (!question || chatLoading) return;

    setChatLoading(true);
    setChatError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          history: chatHistory,
          storyContext: {
            headline: story.headline,
            sourceName: story.sourceName,
            category: story.category,
            publicationDate: story.publicationDate,
            whyWeChoseThis: story.whyWeChoseThis,
            background: readingSupport.background,
            vocabulary: readingSupport.vocabulary,
            readingPrompts: readingSupport.readingPrompts,
          },
        }),
      });
      const data: { ok: boolean; answer?: string; error?: string } = await res.json();

      if (data.ok) {
        setChatHistory((prev) => [...prev, { question, answer: data.answer ?? "" }]);
        setChatInput("");
      } else {
        setChatError(data.error ?? "Something went wrong.");
      }
    } catch {
      setChatError("Couldn't reach the AI assistant. Please check your connection.");
    } finally {
      setChatLoading(false);
    }
  }

  return (
    <SelectionToolsProvider>
      <div className={`${styles.page} ${styles.compact}`}>
        <Link href="/" className={styles.back}>
          ← Back to Hitoshi&rsquo;s News Choices
        </Link>

        <article className={styles.headerCard}>
          <div className={styles.imageWrap}>
            <Image
              src={story.imageUrl}
              alt={story.imageAlt}
              width={story.imageWidth}
              height={story.imageHeight}
              sizes="(max-width: 559px) 100vw, 320px"
              className={styles.image}
            />
            {story.imageSourceType === "ai-generated" && (
              <span className={styles.aiImageBadge}>AI-generated illustration</span>
            )}
          </div>
          <div className={styles.headerContent}>
            <p className={styles.category}>{story.category}</p>
            <SelectableRegion story={story}>
              <h1 className={styles.headline}>{story.headline}</h1>
            </SelectableRegion>
            <p className={styles.meta}>
              {story.sourceName} · {story.category} · {story.estimatedLevel} ·
              About {story.estimatedReadingMinutes} min · {story.publicationDate}
            </p>
          </div>
        </article>

        <SelectableRegion story={story}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Before You Read</h2>
            <h3 className={styles.subheading}>Background</h3>
            <p className={styles.background}>{readingSupport.background}</p>
          </section>
        </SelectableRegion>

        <SelectableRegion story={story}>
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
        </SelectableRegion>

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

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>AI Chat</h2>
          <p className={styles.promptsIntro}>Ask questions about this story or topic.</p>

          {chatHistory.length > 0 && (
            <div className={styles.chatHistory}>
              {chatHistory.map((turn, i) => (
                <div key={i} className={styles.chatTurn}>
                  <p className={styles.chatQuestion}>
                    <span className={styles.chatLabel}>You:</span> {turn.question}
                  </p>
                  <div className={styles.chatAnswer}>
                    <span className={styles.chatLabel}>AI:</span>
                    {renderSimpleMarkdown(turn.answer)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {chatLoading && <p className={styles.promptsIntro}>AI is responding&hellip;</p>}
          {chatError && !chatLoading && <p className={styles.translationError}>{chatError}</p>}

          <div className={styles.askForm}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onCompositionStart={() => {
                isComposingRef.current = true;
              }}
              onCompositionEnd={() => {
                isComposingRef.current = false;
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                // Skip while an IME composition (Japanese/Chinese/Korean, etc.)
                // is active, so Enter can confirm kana/kanji conversion
                // instead of submitting an unfinished question. isComposingRef
                // is the source of truth (set by the composition events above);
                // nativeEvent.isComposing is checked too since some browsers
                // (notably Safari) still report it true on the very keydown
                // that ends composition.
                if (isComposingRef.current || e.nativeEvent.isComposing) return;
                if (!chatLoading) handleSendChatMessage();
              }}
              placeholder="Type your question..."
              className={styles.askInput}
              disabled={chatLoading}
            />
            <button
              type="button"
              onClick={handleSendChatMessage}
              disabled={chatLoading || !chatInput.trim()}
              className={styles.askButton}
            >
              {chatLoading ? "Asking..." : "Ask"}
            </button>
          </div>
        </section>
      </div>
    </SelectionToolsProvider>
  );
}
