"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import type { SelectionStoryContext } from "@/lib/selection-story-context";
import { SelectionToolsContext } from "./selection-tools-context";
import styles from "./SelectionToolsProvider.module.css";

interface ScopeEntry {
  el: HTMLElement;
  context: SelectionStoryContext;
}

interface ActiveSelection {
  text: string;
  rect: { top: number; bottom: number; left: number; right: number };
  context: SelectionStoryContext;
}

interface PanelState {
  kind: "explain" | "translate" | "listen" | null;
  loading: boolean;
  text: string | null;
  error: string | null;
}

const INITIAL_PANEL: PanelState = { kind: null, loading: false, text: null, error: null };
const TOOLBAR_GAP = 8;

/**
 * Mount once per page (homepage, Reading Support). Provides Explain /
 * Translate / Listen for any content wrapped in `SelectableRegion`
 * elsewhere on that page — a single document-level `selectionchange`
 * listener matched against the registered regions, so this scales to any
 * number of stories/sections without per-region listeners.
 *
 * Completely separate from AI Chat, which keeps its own local state in
 * ReadingSupportPage and is untouched by this provider.
 */
export function SelectionToolsProvider({ children }: { children: ReactNode }) {
  const scopesRef = useRef<Map<string, ScopeEntry>>(new Map());
  const toolbarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);

  const [selection, setSelection] = useState<ActiveSelection | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [panel, setPanel] = useState<PanelState>(INITIAL_PANEL);

  const registerScope = useCallback((id: string, el: HTMLElement, context: SelectionStoryContext) => {
    scopesRef.current.set(id, { el, context });
  }, []);
  const unregisterScope = useCallback((id: string) => {
    scopesRef.current.delete(id);
  }, []);

  useLayoutEffect(() => {
    function handleSelectionChange() {
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0 || domSelection.isCollapsed) {
        setSelection(null);
        return;
      }

      const text = domSelection.toString().trim();
      const anchorNode = domSelection.anchorNode;
      if (!text || !anchorNode) {
        setSelection(null);
        return;
      }

      let matchedContext: SelectionStoryContext | null = null;
      for (const { el, context } of scopesRef.current.values()) {
        if (el.contains(anchorNode)) {
          matchedContext = context;
          break;
        }
      }
      if (!matchedContext) {
        setSelection(null);
        return;
      }

      const rect = domSelection.getRangeAt(0).getBoundingClientRect();
      setSelection({
        text,
        rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right },
        context: matchedContext,
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

  async function handleExplain() {
    if (!selection) return;
    const snapshot = selection;
    const myId = ++requestIdRef.current;

    setPanel({ kind: "explain", loading: true, text: null, error: null });

    try {
      const res = await fetch("/api/ai-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text, storyContext: snapshot.context }),
      });
      const data: { ok: boolean; explanation?: string; error?: string } = await res.json();
      if (requestIdRef.current !== myId) return;

      if (data.ok) {
        setPanel({ kind: "explain", loading: false, text: data.explanation ?? "", error: null });
      } else {
        setPanel({ kind: "explain", loading: false, text: null, error: data.error ?? "Something went wrong." });
      }
    } catch {
      if (requestIdRef.current !== myId) return;
      setPanel({ kind: "explain", loading: false, text: null, error: "Couldn't reach the AI assistant. Please check your connection." });
    }
  }

  async function handleTranslate() {
    if (!selection) return;
    const snapshot = selection;
    const myId = ++requestIdRef.current;

    setPanel({ kind: "translate", loading: true, text: null, error: null });

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text }),
      });
      const data: { ok: boolean; translation?: string; error?: string } = await res.json();
      if (requestIdRef.current !== myId) return;

      if (data.ok) {
        setPanel({ kind: "translate", loading: false, text: data.translation ?? "", error: null });
      } else {
        setPanel({ kind: "translate", loading: false, text: null, error: data.error ?? "Something went wrong." });
      }
    } catch {
      if (requestIdRef.current !== myId) return;
      setPanel({ kind: "translate", loading: false, text: null, error: "Couldn't reach the translation service. Please check your connection." });
    }
  }

  async function handleListen() {
    if (!selection) return;
    const snapshot = selection;
    const myId = ++requestIdRef.current;

    stopCurrentAudio();
    setPanel(INITIAL_PANEL);

    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text }),
      });

      if (!res.ok) {
        const data: { error?: string } = await res.json().catch(() => ({}));
        if (requestIdRef.current !== myId) return;
        setPanel({ kind: "listen", loading: false, text: null, error: data.error ?? "Couldn't generate audio for this text." });
        return;
      }

      const blob = await res.blob();
      if (requestIdRef.current !== myId) return;

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
      if (requestIdRef.current !== myId) return;
      setPanel({ kind: "listen", loading: false, text: null, error: "Couldn't reach the audio service. Please check your connection." });
    }
  }

  const panelTitle = panel.kind === "explain" ? "Explanation" : panel.kind === "translate" ? "Translation" : null;
  const panelLoadingText = panel.kind === "explain" ? "Thinking…" : "Translating…";

  return (
    <SelectionToolsContext.Provider value={{ registerScope, unregisterScope }}>
      {children}

      {selection && (
        <div
          ref={toolbarRef}
          className={styles.selectionToolbar}
          style={toolbarPosition ? { top: toolbarPosition.top, left: toolbarPosition.left } : { top: -9999, left: -9999 }}
        >
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleExplain} className={styles.toolbarButton}>
            Explain
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleTranslate} className={styles.toolbarButton}>
            Translate
          </button>
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={handleListen} className={styles.toolbarButton}>
            Listen
          </button>
        </div>
      )}

      {selection && toolbarPosition && (panel.loading || panel.error || panel.text) && (
        <div
          className={styles.resultPanel}
          style={{ top: toolbarPosition.top + toolbarHeight + 6, left: toolbarPosition.left }}
        >
          {panelTitle && <p className={styles.resultTitle}>{panelTitle}</p>}
          {panel.loading && <p className={styles.resultIntro}>{panelLoadingText}</p>}
          {panel.error && !panel.loading && <p className={styles.resultError}>{panel.error}</p>}
          {panel.text && !panel.loading && <p className={styles.resultText}>{panel.text}</p>}
        </div>
      )}
    </SelectionToolsContext.Provider>
  );
}
