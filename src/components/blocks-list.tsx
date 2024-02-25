import { Block } from "../types";
import BlocksListItem from "./blocks-list-item";

type BlockListProps = {
  noteId: string;
  blocks: Block[];
};

export default function BlocksList({ noteId, blocks }: BlockListProps) {
  return (
    <ul>
      {blocks.map((m, i) => (
        <BlocksListItem
          key={m.blockId}
          blockId={m.blockId}
          noteId={noteId}
          content={m.content}
          isLastBlock={i === blocks.length - 1}
        />
      ))}
    </ul>
  );
}
