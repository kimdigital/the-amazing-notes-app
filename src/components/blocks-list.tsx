import { List } from "@chakra-ui/react";
import { Block } from "../types";
import BlocksListItem from "./blocks-list-item";

type BlockListProps = {
  noteId: string;
  blocks: Block[];
};

export default function BlocksList({ noteId, blocks }: BlockListProps) {
  return (
    <List w="100%">
      {blocks.map((m) => (
        <BlocksListItem
          key={m.blockId}
          blockId={m.blockId}
          parentBlockId={m.parentBlockId}
          noteId={noteId}
          content={m.content}
          isLatest={m.isLatest}
        />
      ))}
    </List>
  );
}
