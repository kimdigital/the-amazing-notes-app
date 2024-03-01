import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Block, Note } from "../types";
import { getNewNote } from "../helpers/note-helpers";
import { getNewBlock } from "../helpers/block-helpers";

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
    setNoteBlocks(
      state,
      action: PayloadAction<{ noteId: string; blocks: Block[] }>
    ) {
      const noteId = action.payload.noteId || "";
      const blocks = action.payload.blocks || "";
      const note = state.find((f) => f.noteId === noteId);
      if (note) {
        note.blocks = blocks;
      }
    },
    markNoteAsActive(state, action: PayloadAction<string | null>) {
      const noteId = action.payload || "";
      const note = state.find((f) => f.noteId === noteId);

      state.forEach((e) => (e.isActive = false));

      if (note) {
        note.isActive = true;
      }
    },
    addNoteBlock(
      state,
      action: PayloadAction<{ noteId: string; block: Block | undefined }>
    ) {
      const note = state.find(
        (f) => f.noteId === action.payload.noteId
      );

      const blocks = note?.blocks;
      blocks?.forEach((e) => (e.isLatest = false));

      if (action?.payload?.block) {
        blocks?.push(action.payload.block);
      } else {
        blocks?.push(getNewBlock(""));
      }
    },
    updateNoteBlockContent(
      state,
      action: PayloadAction<{
        noteId: string;
        blockId: string;
        content: string;
      }>
    ) {
      const noteId = action.payload.noteId || "";
      const blockId = action.payload.blockId || "";
      const note = state.find((f) => f.noteId === noteId);
      const block = note?.blocks?.find(
        (f) => f.blockId === blockId
      );
      const content = action.payload.content || "";

      if (block) {
        block.content = content;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  // Notes:
  addNote,
  markNoteAsActive,

  // Blocks:
  setNoteBlocks,
  updateNoteBlockContent,
  addNoteBlock,
} = noteSlice.actions;

export default noteSlice.reducer;
