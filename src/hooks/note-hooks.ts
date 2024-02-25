import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addNote } from "../slices/note-slice";
import { getNewNote } from "../helpers/note-helpers";
import { Note } from "../types";

export function useGetNote() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note);

  return function (noteId: string | null, title?: string): Note {
    let matchingNote = null;
    if (noteId) {
      matchingNote = notes.find((f) => f.noteId === noteId);
    } else {
      matchingNote = notes.find((f) => f.title === title);
    }

    if (!matchingNote && title) {
      matchingNote = getNewNote([], title);
      dispatch(addNote(matchingNote));
    }

    return matchingNote!;
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
