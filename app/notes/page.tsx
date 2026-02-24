import { DSPage } from "@/components/ds/page";
import { NotesDemo } from "@/components/patterns/NotesDemo";

export default function NotesPage() {
  return (
    <DSPage
      title="Notes"
      description="Prototype for note interactions: browse, search/filter, add note, and edit note."
    >
      <NotesDemo />
    </DSPage>
  );
}
