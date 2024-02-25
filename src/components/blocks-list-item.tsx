import React, { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { useTransform } from "../helpers/block-helpers";
import { addNoteBlock, updateNoteBlockContent } from "../slices/note-slice";

type BlockListItemProps = {
  blockId: string;
  noteId: string;
  content: string;
  isLastBlock?: boolean;
};

export default function BlocksListItem({
  blockId,
  noteId,
  content,
  isLastBlock,
}: BlockListItemProps) {
  const dispatch = useAppDispatch();
  const transform = useTransform();
  const [isFocused, setIsFocused] = React.useState(false);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key == "Enter") {
      dispatch(addNoteBlock({ noteId, block: undefined }));
    }
  }
  function toggleIsFocused(value: boolean) {
    setIsFocused(value);
  }
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      updateNoteBlockContent({
        noteId,
        blockId,
        content: event.target.value || "",
      })
    );
  }

  useEffect(() => {
    if (isFocused) {
      const listItemEl = document?.getElementById(blockId);
      const inputEl = listItemEl?.getElementsByTagName("input")[0];

      if (inputEl) {
        inputEl.focus();
      }
    }
  }, [isFocused, blockId]);
  useEffect(() => {
    if (isLastBlock) {
      setIsFocused(true);
    }
  }, [isLastBlock]);

  return (
    <li id={blockId}>
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
        onClick={(event) => {
          if ((event.target as HTMLAnchorElement).tagName === "A") {
            return;
          }
          toggleIsFocused(true);
        }}
      >
        {transform(content)}
      </p>
    </li>
  );
}
