import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import NoteCard from "../components/note-card";
import { useAppSelector } from "../hooks";

export default function NotesList() {
  const notes = useAppSelector((state) => state.notes);
  return (
    <>
      <Flex px={4} py={2} gap={4} direction="column">
        <Heading as="h1">Notes</Heading>
        <Grid templateColumns="repeat(4, 1fr)">
          {notes.map((m) => (
            <GridItem key={m.noteId}>
              <NoteCard noteId={m.noteId} title={m.title} blocks={m.blocks} />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
