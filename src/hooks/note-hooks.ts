import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addNote } from "../slices/note-slice";
import { getNewNote } from "../helpers/note-helpers";
import { Note } from "../types";

export function useGetNote() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes);

  return function (noteId: string | null, title?: string): Note {
    let note = null;
    if (noteId) {
      note = notes.find((f) => f.noteId === noteId);
    } else {
      note = notes.find((f) => f.title === title);
    }

    if (!note && title) {
      note = getNewNote([], title);
      dispatch(addNote(note));
    }

    return note!;
  };
}

export function useNavigateNote() {
  const navigate = useNavigate();
  const getNote = useGetNote();

  return function (noteId: string | null, title?: string) {
    if (!noteId && !title) {
      console.error(
        "useNavigateNote: Provide a valid noteId or title to navigate to a valid note."
      );
      return;
    }

    if (!noteId && title) {
      noteId = getNote(null, title)?.noteId;
    }

    if (noteId) {
      navigate(`/notes/${noteId}`);
    }
  };
}
