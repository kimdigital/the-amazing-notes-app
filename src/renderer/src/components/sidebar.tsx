import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { useNavigateNote } from "../hooks/note-hooks";

export function Sidebar() {
  const notes = useAppSelector((state) => state.notes);
  const navigateNote = useNavigateNote();

  return (
    <Flex p={2} gap={2} direction="column" height="100%" bg="gray.50">
      <RouteLink to="/notes">
        <Link>
          <Heading as="h5" size="sm">
            Notes
          </Heading>
        </Link>
      </RouteLink>
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
