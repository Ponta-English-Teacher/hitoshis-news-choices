import type { ReactNode } from "react";

/**
 * Minimal, dependency-free Markdown-lite renderer: paragraphs, simple bullet
 * lists, and bold/italic inline emphasis. Builds React elements directly
 * (never dangerouslySetInnerHTML), so model output can never inject raw
 * HTML — text content is always React-escaped.
 */

function parseInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_"))) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export function renderSimpleMarkdown(text: string): ReactNode {
  const blocks = text.trim().split(/\n\s*\n/);

  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    const isList = lines.length > 0 && lines.every((l) => /^[-*]\s+/.test(l));

    if (isList) {
      return (
        <ul key={i}>
          {lines.map((line, j) => (
            <li key={j}>{parseInline(line.replace(/^[-*]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }

    return <p key={i}>{parseInline(lines.join(" "))}</p>;
  });
}
