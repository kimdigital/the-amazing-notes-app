import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAppSelector } from "../hooks";

export function Sidebar() {
  const notes = useAppSelector((state) => state.note);

  return (
    <Flex p={2} gap={2} direction="column" minH="100vh" bg="gray.50">
      <Heading as="h5" size="sm">
        Notes
      </Heading>
      {notes.map((m) => (
        <Button variant="ghost" size="sm">
          {m.title}
        </Button>
      ))}
    </Flex>
  );
}
