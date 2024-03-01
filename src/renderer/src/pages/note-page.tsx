import React, { useEffect } from "react";
import NoteEditor from "../components/note-editor";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { markNoteAsActive } from "../slices/note-slice";
// import { useUpdateNoteBlocks } from "../hooks/note-hooks";

export default function NotePage() {
  const dispatch = useAppDispatch();
  // const updateNoteBlocks = useUpdateNoteBlocks();
  const [isEditing, setIsEditing] = React.useState(false);
  const { noteId } = useParams();
  const note = useAppSelector((state) =>
    state.notes.find((f) => f.noteId === noteId)
  );

  useEffect(() => {
    setIsEditing(true);
  }, []);
  useEffect(() => {
    if (noteId) {
      dispatch(markNoteAsActive(noteId));
    }
  }, [noteId, dispatch]);

  return <>{isEditing ? <NoteEditor note={note || null} /> : null}</>;
}
