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
      const matchingNote = state.find((f) => f.noteId === noteId);
      if (matchingNote) {
        matchingNote.blocks = blocks;
      }
    },
    markNoteAsActive(state, action: PayloadAction<string | null>) {
      const noteId = action.payload || "";
      const matchingNote = state.find((f) => f.noteId === noteId);

      state.forEach((e) => (e.isActive = false));

      if (matchingNote) {
        matchingNote.isActive = true;
      }
    },
    addNoteBlock(
      state,
      action: PayloadAction<{ noteId: string; block: Block | undefined }>
    ) {
      const matchingNote = state.find(
        (f) => f.noteId === action.payload.noteId
      );

      if (action?.payload?.block) {
        matchingNote?.blocks?.push(action.payload.block);
      } else {
        matchingNote?.blocks?.push(getNewBlock(""));
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
      const matchingNote = state.find((f) => f.noteId === noteId);
      const matchingBlock = matchingNote?.blocks?.find(
        (f) => f.blockId === blockId
      );
      const content = action.payload.content || "";

      if (matchingBlock) {
        matchingBlock.content = content;
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
