import { Note } from "../types";
import BlocksList from "./blocks-list";

type NoteEditorProps = {
  note: Note | null;
};
export default function NoteEditor({ note }: NoteEditorProps) {
  return (
    <>
      <BlocksList noteId={note?.noteId || ""} blocks={note?.blocks || []} />
    </>
  );
}
