import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../types";
import { getNewBlock } from "../helpers/block-helpers";

export type BlockState = Block[];

const initialState: BlockState = [];

export const blockSlice = createSlice({
  name: "block",
  initialState,
  reducers: {
    setBlocks(state, action: PayloadAction<Block[]>) {
      state = action.payload;
    },
    addBlock(state, action: PayloadAction<Block | undefined>) {
      if (action.payload) {
        state.push(action.payload);
      } else {
        state.push(getNewBlock(""));
      }
    },
    updateBlock(state, action: PayloadAction<{ id: string; content: string }>) {
      const id = action.payload.id || "";
      const content = action.payload.content || "";
      const matchingBlock = state.find((f) => f.id === id);
      if (matchingBlock) {
        matchingBlock.content = content;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBlocks, addBlock, updateBlock } = blockSlice.actions;

export default blockSlice.reducer;
