export type Block = {
  id: string;
  content: string;
  parentId: string | null;
};

export type Note = {
  id: string;
  title: string;
  blocks: Block[];
  isActive: boolean;
};
