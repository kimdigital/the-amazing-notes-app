import { v4 as uuidv4 } from "uuid";
import { handleLinkClick } from "./link-helpers";

export function getNewBlock(content: string, parentId?: string | null) {
  return {
    id: uuidv4(),
    content,
    parentId: parentId || null,
  };
}

export function transformIntoHTML(content: string) {
  const transformedContent = content
    .split(/\[\[(.*?)\]\]/g)
    .map((noteName, index) => {
      if (index % 2 === 1) {
        return (
          <a key={index} onClick={() => handleLinkClick(noteName)}>
            {noteName}
          </a>
        );
      } else {
        return noteName;
      }
    });

  return transformedContent;
}
