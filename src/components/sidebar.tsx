import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../hooks";
import { useNavigateNote } from "../hooks/note-hooks";

export function Sidebar() {
  const notes = useAppSelector((state) => state.note);
  const navigateNote = useNavigateNote();

  return (
    <Flex p={2} gap={2} direction="column" minH="100vh" bg="gray.50">
      <Heading as="h5" size="sm">
        Notes
      </Heading>
      {notes.map((m) => (
        <Button
          key={m.noteId}
          variant="ghost"
          bg={m.isActive ? "gray.200" : ""}
          size="sm"
          onClick={() => navigateNote(m.noteId)}
        >
          {m.title}
        </Button>
      ))}
    </Flex>
  );
}
