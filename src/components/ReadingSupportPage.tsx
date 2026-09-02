"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NewsStory, ReadingSupport } from "@/types/news-story";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
import styles from "./ReadingSupportPage.module.css";

interface ChatTurn {
  question: string;
  answer: string;
}

interface ActiveSelection {
  text: string;
  rect: { top: number; bottom: number; left: number; right: number };
}

const TOOLBAR_GAP = 8;

export function ReadingSupportPage({
  story,
  readingSupport,
}: {
  story: NewsStory;
  readingSupport: ReadingSupport;
}) {
  const beforeYouReadRef = useRef<HTMLDivElement>(null);
  const keyEnglishRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const isComposingRef = useRef(false);

  const [selection, setSelection] = useState<ActiveSelection | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [listenError, setListenError] = useState<string | null>(null);

  const [aiHelpLoading, setAiHelpLoading] = useState(false);
  const [aiHelpAnswer, setAiHelpAnswer] = useState<string | null>(null);
  const [aiHelpError, setAiHelpError] = useState<string | null>(null);

  const [chatHistory, setChatHistory] = useState<ChatTurn[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  useLayoutEffect(() => {
    function handleSelectionChange() {
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0 || domSelection.isCollapsed) {
        setSelection(null);
        return;
      }

      const text = domSelection.toString().trim();
      const anchorNode = domSelection.anchorNode;
      const inScope =
        anchorNode &&
        (beforeYouReadRef.current?.contains(anchorNode) || keyEnglishRef.current?.contains(anchorNode));
      if (!text || !inScope) {
        setSelection(null);
        return;
      }

      const rect = domSelection.getRangeAt(0).getBoundingClientRect();
      setSelection({
        text,
        rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right },
      });
    }

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => document.removeEventListener("selectionchange", handleSelectionChange);
  }, []);

  useLayoutEffect(() => {
    if (!selection || !toolbarRef.current) {
      setToolbarPosition(null);
      return;
    }

    const { width, height } = toolbarRef.current.getBoundingClientRect();
    setToolbarHeight(height);
    const midX = (selection.rect.left + selection.rect.right) / 2;

    let top = selection.rect.top - height - TOOLBAR_GAP;
    if (top < TOOLBAR_GAP) top = selection.rect.bottom + TOOLBAR_GAP;
    top = Math.max(TOOLBAR_GAP, Math.min(top, window.innerHeight - height - TOOLBAR_GAP));

    const left = Math.max(TOOLBAR_GAP, Math.min(midX - width / 2, window.innerWidth - width - TOOLBAR_GAP));

    setToolbarPosition({ top, left });
  }, [selection]);

  function stopCurrentAudio() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
  }

  useEffect(() => stopCurrentAudio, []);

  async function handleListen() {
    if (!selection) return;
    const snapshot = selection;

    stopCurrentAudio();
    setListenError(null);

    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        setListenError(data.error ?? "Couldn't generate audio for this text.");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        URL.revokeObjectURL(url);
        if (audioUrlRef.current === url) audioUrlRef.current = null;
        if (audioRef.current === audio) audioRef.current = null;
      };
      audio.play();
    } catch {
      setListenError("Couldn't reach the audio service. Please check your connection.");
    }
  }

  async function handleAIHelp() {
    if (!selection) return;
    const snapshot = selection;

    setAiHelpLoading(true);
    setAiHelpError(null);
    setAiHelpAnswer(null);

    try {
      const res = await fetch("/api/ai-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: snapshot.text,
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
      const data: { ok: boolean; explanation?: string; error?: string } = await res.json();

      if (data.ok) {
        setAiHelpAnswer(data.explanation ?? "");
      } else {
        setAiHelpError(data.error ?? "Something went wrong.");
      }
    } catch {
      setAiHelpError("Couldn't reach the AI assistant. Please check your connection.");
    } finally {
      setAiHelpLoading(false);
    }
  }

  async function handleTranslate() {
    if (!selection) return;
    const snapshot = selection;

    setLoading(true);
    setError(null);
    setTranslation(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text }),
      });
      const data: { ok: boolean; translation?: string; error?: string } = await res.json();

      if (data.ok) {
        setTranslation(data.translation ?? "");
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Couldn't reach the translation service. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

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
          <h1 className={styles.headline}>{story.headline}</h1>
          <p className={styles.meta}>
            {story.sourceName} · {story.category} · {story.estimatedLevel} ·
            About {story.estimatedReadingMinutes} min · {story.publicationDate}
          </p>
        </div>
      </article>

      <div ref={beforeYouReadRef}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Before You Read</h2>
          <h3 className={styles.subheading}>Background</h3>
          <p className={styles.background}>{readingSupport.background}</p>
        </section>
      </div>

      {(aiHelpLoading || aiHelpError || aiHelpAnswer) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>AI Help</h2>
          {aiHelpLoading && <p className={styles.promptsIntro}>Thinking&hellip;</p>}
          {aiHelpError && !aiHelpLoading && <p className={styles.translationError}>{aiHelpError}</p>}
          {aiHelpAnswer && !aiHelpLoading && <p className={styles.translationText}>{aiHelpAnswer}</p>}
        </section>
      )}

      {(loading || error || translation) && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Translation</h2>
          {loading && <p className={styles.promptsIntro}>Translating&hellip;</p>}
          {error && !loading && <p className={styles.translationError}>{error}</p>}
          {translation && !loading && <p className={styles.translationText}>{translation}</p>}
        </section>
      )}

      <div ref={keyEnglishRef}>
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
      </div>

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

      {selection && (
        <div
          ref={toolbarRef}
          className={styles.selectionToolbar}
          style={toolbarPosition ? { top: toolbarPosition.top, left: toolbarPosition.left } : { top: -9999, left: -9999 }}
        >
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleAIHelp}
            className={styles.translateButton}
          >
            AI Help
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleTranslate}
            className={styles.translateButton}
          >
            Translate
          </button>
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleListen}
            className={styles.translateButton}
          >
            Listen
          </button>
        </div>
      )}

      {selection && listenError && toolbarPosition && (
        <div
          className={styles.listenErrorToast}
          style={{ top: toolbarPosition.top + toolbarHeight + 6, left: toolbarPosition.left }}
        >
          {listenError}
        </div>
      )}
    </div>
  );
}
