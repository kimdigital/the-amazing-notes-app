export type Block = {
  blockId: string;
  content: string;
  parentBlockId: string | null;
  isLatest?: boolean;
};

export type Note = {
  noteId: string;
  title: string;
  blocks: Block[];
  isActive: boolean;
};
