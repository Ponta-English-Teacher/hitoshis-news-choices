"use client";

import { createContext, useContext, useEffect, useId, type RefObject } from "react";
import type { SelectionStoryContext } from "@/lib/selection-story-context";

export interface SelectionToolsContextValue {
  registerScope: (id: string, el: HTMLElement, context: SelectionStoryContext) => void;
  unregisterScope: (id: string) => void;
}

export const SelectionToolsContext = createContext<SelectionToolsContextValue | null>(null);

/**
 * Opts a DOM region into Explain/Translate/Listen. Used internally by
 * `SelectableRegion` — activities should wrap content in that component
 * rather than calling this directly.
 */
export function useRegisterSelectableScope(
  ref: RefObject<HTMLElement | null>,
  context: SelectionStoryContext
) {
  const ctx = useContext(SelectionToolsContext);
  const id = useId();

  useEffect(() => {
    if (!ctx || !ref.current) return;
    ctx.registerScope(id, ref.current, context);
    return () => ctx.unregisterScope(id);
  }, [ctx, id, context, ref]);
}
