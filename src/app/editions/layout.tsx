import { editions } from "@/data/editions";
import { EditionsSidebar } from "@/components/EditionsSidebar";
import { SelectionToolsProvider } from "@/components/selection-tools/SelectionToolsProvider";
import styles from "./layout.module.css";

/**
 * Shared archive shell for /editions and /editions/[date]: a "Previous
 * Editions" sidebar (desktop) / compact disclosure (mobile) alongside
 * whichever edition's stories the page below renders. Narrows the full
 * `editions` data (each entry includes all six stories' full content) down
 * to just {date, dateRangeLabel} before handing it to the sidebar, which
 * is a Client Component — keeps story content itself out of that bundle.
 */
export default function EditionsLayout(props: LayoutProps<"/editions">) {
  const editionSummaries = editions.map(({ date, dateRangeLabel }) => ({ date, dateRangeLabel }));

  return (
    <SelectionToolsProvider>
      <div className={styles.shell}>
        <EditionsSidebar editions={editionSummaries} />
        <div className={styles.main}>{props.children}</div>
      </div>
    </SelectionToolsProvider>
  );
}
