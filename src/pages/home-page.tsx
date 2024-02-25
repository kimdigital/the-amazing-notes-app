// import BlocksList from "../components/blocks-list";

import { useEffect } from "react";
import { useNavigateNote } from "../hooks/note-hooks";
import { useAppSelector } from "../hooks";

export default function HomePage() {
  const navigateNote = useNavigateNote();
  const note = useAppSelector((state) => state.notes[0]);

  useEffect(() => {
    if (note.noteId) {
      navigateNote(note?.noteId);
    }
  }, [note]);

  return <></>;
}
