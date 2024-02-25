import { v4 as uuidv4 } from "uuid";
import { Block, Note } from "../types";
import { getNewBlock } from "./block-helpers";

export function getNewNote(blocks?: Block[]): Note {
  if (!blocks) {
    blocks = [getNewBlock("Hello World!")];
  }

  return {
    id: uuidv4(),
    title: "Untitled",
    blocks,
  };
}
