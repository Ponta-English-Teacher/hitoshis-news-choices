import { latestEdition } from "@/data/editions";
import { EditionStories } from "@/components/EditionStories";

export const metadata = {
  title: "Previous Editions — Hitoshi's News Choices",
};

export default function EditionsPage() {
  return <EditionStories edition={latestEdition} />;
}
