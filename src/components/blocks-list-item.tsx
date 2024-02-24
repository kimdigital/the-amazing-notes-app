import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { addBlock, updateBlock } from "../slices/block-slice";

type BlockListItemProps = {
  id: string;
  content: string;
  isLastBlock?: boolean;
};

export default function BlocksListItem({
  id,
  content,
  isLastBlock,
}: // parentId,
BlockListItemProps) {
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = React.useState(true);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      dispatch(addBlock());
    }
  }
  function toggleIsFocused(value: boolean) {
    setIsFocused(value);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(updateBlock({ id, content: event.target.value || "" }));
  }

  useEffect(() => {
    if (isFocused) {
      const listItemEl = document?.getElementById(id);
      const inputEl = listItemEl?.getElementsByTagName("input")[0];

      if (inputEl) {
        inputEl.focus();
      }
    }
  }, [isFocused, id]);
  useEffect(() => {
    if (isLastBlock) {
      setIsFocused(true);
    }
  }, [isLastBlock]);

  return (
    <li id={id}>
      <input
        style={{ display: !isFocused ? "none" : "" }}
        value={content}
        onChange={handleChange}
        onFocus={() => toggleIsFocused(true)}
        onBlur={() => toggleIsFocused(false)}
        onKeyDown={handleKeyDown}
      />
      <p
        style={{ display: isFocused ? "none" : "" }}
        onClick={() => toggleIsFocused(true)}
      >
        {content}
      </p>
    </li>
  );
}
