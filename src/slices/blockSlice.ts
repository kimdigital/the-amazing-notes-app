import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Block } from "../types";
import { getNewBlock } from "../helpers/blockHelpers";

export type BlockState = Block[];

const initialState: BlockState = [getNewBlock("Hello World!")];

export const blockSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
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
export const { addBlock, updateBlock } = blockSlice.actions;

export default blockSlice.reducer;
