import { v4 as uuidv4 } from "uuid";
import { Block, Note } from "../types";
import { getNewBlock } from "./block-helpers";

export function getNewNote(blocks?: Block[], title?: string): Note {
  if (!blocks?.length) {
    blocks = [getNewBlock("")];
  }

  return {
    noteId: uuidv4(),
    title: title || "Untitled",
    blocks,
    isActive: false,
  };
}
