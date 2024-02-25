import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Block, Note } from "../types";
import { getNewNote } from "../helpers/note-helpers";

export type NoteState = Note[];

const initialState: NoteState = [getNewNote()];

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note | undefined>) {
      if (action.payload) {
        state.push(action.payload);
      } else {
        state.push(getNewNote());
      }
    },
    updateNoteBlocks(
      state,
      action: PayloadAction<{ id: string; blocks: Block[] }>
    ) {
      const id = action.payload.id || "";
      const blocks = action.payload.blocks || "";
      const matchingNote = state.find((f) => f.id === id);
      if (matchingNote) {
        matchingNote.blocks = blocks;
      }
    },
    markNoteAsActive(state, action: PayloadAction<string | null>) {
      const id = action.payload || "";
      const matchingNote = state.find((f) => f.id === id);

      state.forEach((e) => (e.isActive = false));
      
      if (matchingNote) {
        matchingNote.isActive = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, updateNoteBlocks, markNoteAsActive } =
  noteSlice.actions;

export default noteSlice.reducer;
