"use client";

import { useMemo, useRef, type ReactNode } from "react";
import type { NewsStory } from "@/types/news-story";
import { buildSelectionStoryContext } from "@/lib/selection-story-context";
import { useRegisterSelectableScope } from "./selection-tools-context";

/**
 * Marks a region of a story's own English content (headline, background,
 * key vocabulary, etc.) as eligible for the Explain / Translate / Listen
 * selection toolbar. Must be mounted inside a `SelectionToolsProvider`.
 *
 * Do not wrap navigation, buttons, source/license metadata, or the external
 * publisher article.
 */
export function SelectableRegion({
  story,
  children,
  className,
}: {
  story: NewsStory;
  children: ReactNode;
  /** Optional class for the wrapping div — e.g. `display: contents` when the
   *  region sits inside a parent that lays out its own direct children
   *  (such as a flex container) and the wrapper must not introduce an
   *  extra box. */
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const context = useMemo(() => buildSelectionStoryContext(story), [story]);
  useRegisterSelectableScope(ref, context);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
