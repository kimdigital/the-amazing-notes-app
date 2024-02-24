import { useAppSelector } from "../hooks";
import BlocksListItem from "./blocks-list-item";

export default function BlocksList() {
  const blocks = useAppSelector((state) => state.block);

  return (
    <ul>
      {blocks.map((m, i) => (
        <BlocksListItem
          key={m.id}
          id={m.id}
          content={m.content}
          isLastBlock={i === blocks.length - 1}
        />
      ))}
    </ul>
  );
}
