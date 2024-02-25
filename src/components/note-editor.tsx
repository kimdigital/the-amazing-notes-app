import { Flex } from "@chakra-ui/react";
import { Note } from "../types";
import BlocksList from "./blocks-list";

type NoteEditorProps = {
  note: Note | null;
};
export default function NoteEditor({ note }: NoteEditorProps) {
  return (
    <Flex p={4}>
      <BlocksList noteId={note?.noteId || ""} blocks={note?.blocks?.filter(f => !f.parentBlockId) || []} />
    </Flex>
  );
}
