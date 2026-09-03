import { notFound } from "next/navigation";
import { findEditionByDate } from "@/data/editions";
import { EditionStories } from "@/components/EditionStories";

export default async function EditionPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const edition = findEditionByDate(date);

  if (!edition) {
    notFound();
  }

  return <EditionStories edition={edition} subtitle="Archived edition." />;
}
