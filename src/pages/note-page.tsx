import React, { useEffect } from "react";
import NoteEditor from "../components/note-editor";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { markNoteAsActive } from "../slices/note-slice";

export default function NotePage() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = React.useState(false);
  const { noteId } = useParams();

  useEffect(() => {
    setIsEditing(true);
  }, []);
  useEffect(() => {
    if (noteId) {
      dispatch(markNoteAsActive(noteId));
    }

    return () => {
      dispatch(markNoteAsActive(null));
    };
  }, [noteId, dispatch]);

  return <>{isEditing ? <NoteEditor /> : null}</>;
}
