import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Block } from "../types";
import { useNavigateNote } from "../hooks/note-hooks";

type NoteCardProps = {
  id: string;
  title: string;
  blocks: Block[];
};

export default function NoteCard({ id, title, blocks }: NoteCardProps) {
  const navigateNote = useNavigateNote();
  return (
    <>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>

            <Text py="2">
              {blocks
                .slice(0, 3)
                .map((m) => m.content)
                .join("")}
            </Text>
          </CardBody>

          <CardFooter>
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => navigateNote(id)}
            >
              Open
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
}
