"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import type { SelectionStoryContext } from "@/lib/selection-story-context";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
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
  kind: "explain" | "translate" | null;
  loading: boolean;
  text: string | null;
  error: string | null;
  /** The story context behind the current result, reused if the student
   *  selects text inside the result panel itself (e.g. Explain again on a
   *  word from the explanation) — same story, same grounding. */
  context: SelectionStoryContext | null;
}

const INITIAL_PANEL: PanelState = { kind: null, loading: false, text: null, error: null, context: null };
const RESULT_PANEL_SCOPE_ID = "selection-tools-result-panel";
const TOOLBAR_GAP = 8;

const DEFAULT_PANEL_WIDTH = 320;
const MIN_PANEL_WIDTH = 260;
const MIN_PANEL_HEIGHT = 160;
const VIEWPORT_MARGIN = 40;
const MIN_HEADER_VISIBLE = 80;

interface DragState {
  pointerId: number;
  startX: number;
  startY: number;
  startTop: number;
  startLeft: number;
}

interface ResizeState {
  pointerId: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
}

/**
 * Mount once per page (homepage, Reading Support). Provides Explain /
 * Translate / Listen for any content wrapped in `SelectableRegion`
 * elsewhere on that page — a single document-level `selectionchange`
 * listener matched against the registered regions, so this scales to any
 * number of stories/sections without per-region listeners.
 *
 * The floating toolbar is temporary (tied to the live text selection); the
 * Explain/Translate result panel is deliberately independent of it once
 * opened, so interacting with the panel itself (selecting/copying its
 * text, clicking inside it) never closes it — only the close button or a
 * genuine click outside the panel does.
 *
 * Completely separate from AI Chat, which keeps its own local state in
 * ReadingSupportPage and is untouched by this provider.
 */
export function SelectionToolsProvider({ children }: { children: ReactNode }) {
  const scopesRef = useRef<Map<string, ScopeEntry>>(new Map());
  const toolbarRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resultTextRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const requestIdRef = useRef(0);

  const [selection, setSelection] = useState<ActiveSelection | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState<{ top: number; left: number } | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [listenError, setListenError] = useState<string | null>(null);

  const [panel, setPanel] = useState<PanelState>(INITIAL_PANEL);
  const [panelPosition, setPanelPosition] = useState<{ top: number; left: number } | null>(null);
  const [panelWidth, setPanelWidth] = useState(DEFAULT_PANEL_WIDTH);
  const [panelHeight, setPanelHeight] = useState<number | null>(null);

  const dragStateRef = useRef<DragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);

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

  const closePanel = useCallback(() => {
    setPanel(INITIAL_PANEL);
    setPanelPosition(null);
  }, []);

  // Dismiss the panel on a genuine outside click only — never because the
  // source text selection changed or was cleared, and never for a click or
  // drag-select that lands inside the panel or on the toolbar itself.
  useEffect(() => {
    if (panel.kind === null) return;

    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (toolbarRef.current?.contains(target)) return;
      closePanel();
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [panel.kind, closePanel]);

  // The result panel's own text is itself selectable content: register it
  // as a scope (reusing the same story context the panel was opened with)
  // so Explain/Translate/Listen work recursively on text inside a result,
  // e.g. selecting "present perfect" inside an Explanation and explaining
  // that too. Only the result text is registered — the heading and close
  // button are deliberately left out of scope.
  useEffect(() => {
    if (!resultTextRef.current || !panel.context) return;
    const el = resultTextRef.current;
    const context = panel.context;
    registerScope(RESULT_PANEL_SCOPE_ID, el, context);
    return () => unregisterScope(RESULT_PANEL_SCOPE_ID);
  }, [panel.text, panel.context, registerScope, unregisterScope]);

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
    if (!selection || !toolbarPosition) return;
    const snapshot = selection;
    const anchor = { top: toolbarPosition.top + toolbarHeight + 6, left: toolbarPosition.left };
    const myId = ++requestIdRef.current;

    setPanelPosition(anchor);
    setPanel({ kind: "explain", loading: true, text: null, error: null, context: snapshot.context });

    try {
      const res = await fetch("/api/ai-help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text, storyContext: snapshot.context }),
      });
      const data: { ok: boolean; explanation?: string; error?: string } = await res.json();
      if (requestIdRef.current !== myId) return;

      if (data.ok) {
        setPanel({ kind: "explain", loading: false, text: data.explanation ?? "", error: null, context: snapshot.context });
      } else {
        setPanel({ kind: "explain", loading: false, text: null, error: data.error ?? "Something went wrong.", context: snapshot.context });
      }
    } catch {
      if (requestIdRef.current !== myId) return;
      setPanel({ kind: "explain", loading: false, text: null, error: "Couldn't reach the AI assistant. Please check your connection.", context: snapshot.context });
    }
  }

  async function handleTranslate() {
    if (!selection || !toolbarPosition) return;
    const snapshot = selection;
    const anchor = { top: toolbarPosition.top + toolbarHeight + 6, left: toolbarPosition.left };
    const myId = ++requestIdRef.current;

    setPanelPosition(anchor);
    setPanel({ kind: "translate", loading: true, text: null, error: null, context: snapshot.context });

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: snapshot.text }),
      });
      const data: { ok: boolean; translation?: string; error?: string } = await res.json();
      if (requestIdRef.current !== myId) return;

      if (data.ok) {
        setPanel({ kind: "translate", loading: false, text: data.translation ?? "", error: null, context: snapshot.context });
      } else {
        setPanel({ kind: "translate", loading: false, text: null, error: data.error ?? "Something went wrong.", context: snapshot.context });
      }
    } catch {
      if (requestIdRef.current !== myId) return;
      setPanel({ kind: "translate", loading: false, text: null, error: "Couldn't reach the translation service. Please check your connection.", context: snapshot.context });
    }
  }

  async function handleListen() {
    if (!selection) return;
    const snapshot = selection;
    const myId = ++requestIdRef.current;

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
        if (requestIdRef.current !== myId) return;
        setListenError(data.error ?? "Couldn't generate audio for this text.");
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
      setListenError("Couldn't reach the audio service. Please check your connection.");
    }
  }

  // Header drag: the header is the only drag surface (never the body text,
  // so selecting text inside the result still works normally). Uses pointer
  // capture so move/up are delivered to the header even once the pointer
  // leaves it — no document-level listeners needed.
  function handleHeaderPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button")) return;
    if (!panelPosition) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTop: panelPosition.top,
      startLeft: panelPosition.left,
    };
  }

  function handleHeaderPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const deltaX = e.clientX - drag.startX;
    const deltaY = e.clientY - drag.startY;

    // Clamp so the header always stays reachable — never lose the panel
    // entirely off-screen.
    const top = Math.max(0, Math.min(drag.startTop + deltaY, window.innerHeight - MIN_HEADER_VISIBLE));
    const left = Math.max(
      MIN_HEADER_VISIBLE - panelWidth,
      Math.min(drag.startLeft + deltaX, window.innerWidth - MIN_HEADER_VISIBLE)
    );

    setPanelPosition({ top, left });
  }

  function handleHeaderPointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (dragStateRef.current?.pointerId === e.pointerId) dragStateRef.current = null;
  }

  function handleResizePointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    e.currentTarget.setPointerCapture(e.pointerId);
    resizeStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: rect.width,
      startHeight: rect.height,
    };
  }

  function handleResizePointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const resize = resizeStateRef.current;
    if (!resize || resize.pointerId !== e.pointerId) return;

    const deltaX = e.clientX - resize.startX;
    const deltaY = e.clientY - resize.startY;

    const maxWidth = Math.max(MIN_PANEL_WIDTH, window.innerWidth - VIEWPORT_MARGIN);
    const maxHeight = Math.max(MIN_PANEL_HEIGHT, window.innerHeight - VIEWPORT_MARGIN);

    setPanelWidth(Math.min(maxWidth, Math.max(MIN_PANEL_WIDTH, resize.startWidth + deltaX)));
    setPanelHeight(Math.min(maxHeight, Math.max(MIN_PANEL_HEIGHT, resize.startHeight + deltaY)));
  }

  function handleResizePointerUp(e: ReactPointerEvent<HTMLDivElement>) {
    if (resizeStateRef.current?.pointerId === e.pointerId) resizeStateRef.current = null;
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

      {selection && listenError && toolbarPosition && (
        <div
          className={styles.listenErrorToast}
          style={{ top: toolbarPosition.top + toolbarHeight + 6, left: toolbarPosition.left }}
        >
          {listenError}
        </div>
      )}

      {panelPosition && (panel.loading || panel.error || panel.text) && (
        <div
          ref={panelRef}
          className={styles.resultPanel}
          style={{
            top: panelPosition.top,
            left: panelPosition.left,
            width: panelWidth,
            ...(panelHeight !== null ? { height: panelHeight } : {}),
          }}
        >
          <div
            className={styles.resultHeader}
            onPointerDown={handleHeaderPointerDown}
            onPointerMove={handleHeaderPointerMove}
            onPointerUp={handleHeaderPointerUp}
            onPointerCancel={handleHeaderPointerUp}
          >
            {panelTitle && <p className={styles.resultTitle}>{panelTitle}</p>}
            <button type="button" onClick={closePanel} className={styles.resultClose} aria-label="Close">
              ×
            </button>
          </div>

          <div className={`${styles.resultBody} ${panelHeight === null ? styles.resultBodyAuto : ""}`}>
            {panel.loading && <p className={styles.resultIntro}>{panelLoadingText}</p>}
            {panel.error && !panel.loading && <p className={styles.resultError}>{panel.error}</p>}
            {panel.text && !panel.loading && (
              <div ref={resultTextRef} className={styles.resultText}>
                {renderSimpleMarkdown(panel.text)}
              </div>
            )}
          </div>

          <div
            className={styles.resizeHandle}
            onPointerDown={handleResizePointerDown}
            onPointerMove={handleResizePointerMove}
            onPointerUp={handleResizePointerUp}
            onPointerCancel={handleResizePointerUp}
          />
        </div>
      )}
    </SelectionToolsContext.Provider>
  );
}
