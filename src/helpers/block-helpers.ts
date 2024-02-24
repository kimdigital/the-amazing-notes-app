import { v4 as uuidv4 } from "uuid";

export function getNewBlock(content: string, parentId?: string | null) {
  return {
    id: uuidv4(),
    content,
    parentId: parentId || null,
  };
}
