import { v4 as uuidv4 } from "uuid";
import { useNavigateNote } from "../hooks/note-hooks";
import { Link } from "@chakra-ui/react";

export function getNewBlock(content: string, parentId?: string | null) {
  return {
    blockId: uuidv4(),
    content,
    parentBlockId: parentId || null,
  };
}

export function useTransform() {
  const navigateNote = useNavigateNote();
  return function (content: string) {
    const transformedContent = content
      .split(/\[\[(.*?)\]\]/g)
      .map((noteName, index) => {
        if (index % 2 === 1) {
          return (
            <Link key={index} onClick={() => navigateNote(null, noteName)}>
              {noteName}
            </Link>
          );
        } else {
          return noteName;
        }
      });

    return transformedContent;
  };
}
