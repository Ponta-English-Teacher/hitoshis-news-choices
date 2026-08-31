"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsStory, ReadingSupport } from "@/types/news-story";
import type {
  ReadingHelpAction,
  ReadingHelpRequest,
  ReadingHelpResponse,
  ReadingHelpStoryContext,
} from "@/types/reading-help";
import styles from "./ReadingSupportPage.module.css";

const TOOLBAR_ACTIONS: { action: ReadingHelpAction; label: string }[] = [
  { action: "translate", label: "Translate" },
  { action: "explain", label: "Explain This" },
  { action: "news-english", label: "News English" },
  { action: "how-to-read", label: "How to Read This" },
];

interface SelectionState {
  text: string;
  top: number;
  left: number;
}

interface HelpEntry {
  id: string;
  label: string;
  sourceText: string;
  status: "loading" | "done" | "error";
  responseText?: string;
  errorMessage?: string;
}

function createEntryId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function ReadingSupportPage({
  story,
  readingSupport,
}: {
  story: NewsStory;
  readingSupport: ReadingSupport;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [entries, setEntries] = useState<HelpEntry[]>([]);
  const [question, setQuestion] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  const storyContext: ReadingHelpStoryContext = useMemo(
    () => ({
      headline: story.headline,
      sourceName: story.sourceName,
      category: story.category,
      estimatedLevel: story.estimatedLevel,
      background: readingSupport.background,
      vocabulary: readingSupport.vocabulary,
    }),
    [story, readingSupport],
  );

  // Detect a non-empty text selection anywhere inside this page's content
  // (Background, Key English, prompts, AI responses, Ask AI answers) and
  // show a floating toolbar near it. A plain click collapses the browser
  // selection, so this never fires for normal link/button clicks.
  useEffect(() => {
    function handleSelectionEnd() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setSelection(null);
        return;
      }
      const text = sel.toString().trim();
      if (!text) {
        setSelection(null);
        return;
      }
      const anchorNode = sel.anchorNode;
      if (
        !containerRef.current ||
        !anchorNode ||
        !containerRef.current.contains(anchorNode)
      ) {
        setSelection(null);
        return;
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect();
      setSelection({
        text,
        top: rect.top,
        left: rect.left + rect.width / 2,
      });
    }

    function handleScroll() {
      setSelection(null);
    }

    document.addEventListener("mouseup", handleSelectionEnd);
    document.addEventListener("touchend", handleSelectionEnd);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseup", handleSelectionEnd);
      document.removeEventListener("touchend", handleSelectionEnd);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const submitHelpRequest = useCallback(
    async (id: string, payload: ReadingHelpRequest) => {
      try {
        const res = await fetch("/api/reading-help", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data: ReadingHelpResponse = await res.json();
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === id
              ? data.error
                ? { ...entry, status: "error", errorMessage: data.error }
                : { ...entry, status: "done", responseText: data.response }
              : entry,
          ),
        );
      } catch {
        setEntries((prev) =>
          prev.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  status: "error",
                  errorMessage:
                    "Something went wrong reaching AI Reading Help. Please try again.",
                }
              : entry,
          ),
        );
      }
    },
    [],
  );

  // Selection-triggered actions are recursive by construction: the AI
  // response text below is rendered as normal selectable HTML inside this
  // same containerRef, so selecting part of a response re-triggers
  // handleSelectionEnd above and opens the same toolbar again.
  const runSelectionAction = useCallback(
    (action: ReadingHelpAction, label: string, text: string) => {
      setSelection(null);
      window.getSelection()?.removeAllRanges();

      const id = createEntryId();
      setEntries((prev) => [
        ...prev,
        { id, label, sourceText: text, status: "loading" },
      ]);

      void submitHelpRequest(id, {
        mode: "selection",
        action,
        selectedText: text,
        storyContext,
      });
    },
    [storyContext, submitHelpRequest],
  );

  const handleAsk = useCallback(() => {
    const trimmed = question.trim();
    if (!trimmed || isAsking) return;

    setIsAsking(true);
    const id = createEntryId();
    setEntries((prev) => [
      ...prev,
      { id, label: "Ask AI", sourceText: trimmed, status: "loading" },
    ]);
    setQuestion("");

    void submitHelpRequest(id, {
      mode: "ask",
      question: trimmed,
      storyContext,
    }).finally(() => setIsAsking(false));
  }, [question, isAsking, storyContext, submitHelpRequest]);

  return (
    <div className={`${styles.page} ${styles.compact}`} ref={containerRef}>
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
        <h2 className={styles.sectionTitle}>Ask AI</h2>
        <p className={styles.promptsIntro}>
          Ask about the topic, background, vocabulary, or how to approach
          reading it.
        </p>
        <textarea
          className={styles.askInput}
          placeholder="e.g. Why is the Japanese government supporting this investment?"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={2}
        />
        <button
          type="button"
          className={styles.askButton}
          onClick={handleAsk}
          disabled={isAsking || !question.trim()}
        >
          {isAsking ? "Asking…" : "Ask AI"}
        </button>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>AI Reading Help</h2>
        {entries.length === 0 ? (
          <p className={styles.promptsIntro}>
            Select any text on this page &mdash; the Background, Key
            English, prompts, or an AI response &mdash; for Translate,
            Explain This, News English, or How to Read This. Or ask a
            question above.
          </p>
        ) : (
          <div className={styles.entryList}>
            {entries.map((entry) => (
              <div key={entry.id} className={styles.entry}>
                <p className={styles.entryLabel}>{entry.label}</p>
                <p className={styles.entrySource}>
                  &ldquo;{entry.sourceText}&rdquo;
                </p>
                {entry.status === "loading" && (
                  <p className={styles.entryLoading}>Thinking…</p>
                )}
                {entry.status === "error" && (
                  <p className={styles.entryError}>{entry.errorMessage}</p>
                )}
                {entry.status === "done" && (
                  <p className={styles.entryResponse}>{entry.responseText}</p>
                )}
              </div>
            ))}
          </div>
        )}
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

      {selection && (
        <div
          className={styles.toolbar}
          style={{ top: selection.top - 8, left: selection.left }}
        >
          {TOOLBAR_ACTIONS.map(({ action, label }) => (
            <button
              key={action}
              type="button"
              className={styles.toolbarButton}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => runSelectionAction(action, label, selection.text)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
