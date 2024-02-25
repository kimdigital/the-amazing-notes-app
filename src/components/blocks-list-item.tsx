import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNewBlock, useTransform } from "../helpers/block-helpers";
import { addNoteBlock, updateNoteBlockContent } from "../slices/note-slice";
import BlocksList from "./blocks-list";
import { Block } from "../types";
import { Box, Flex, Input, ListItem, Text } from "@chakra-ui/react";

type BlockListItemProps = {
  blockId: string;
  noteId: string;
  content: string;
  parentBlockId: string | null;
  isLatest?: boolean;
};

export default function BlocksListItem({
  blockId,
  noteId,
  parentBlockId,
  content,
  isLatest,
}: BlockListItemProps) {
  const dispatch = useAppDispatch();
  const transform = useTransform();
  const [isFocused, setIsFocused] = React.useState(false);
  const [childBlocks, setChildBlocks] = React.useState<Block[]>([]);
  const note = useAppSelector((state) =>
    state.notes?.find((f) => f.noteId == noteId)
  );

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case "Enter": {
        dispatch(
          addNoteBlock({ noteId, block: getNewBlock("", parentBlockId) })
        );
        break;
      }
      case "Tab": {
        dispatch(addNoteBlock({ noteId, block: getNewBlock("", blockId) }));
        event.stopPropagation();
        event.preventDefault();
        break;
      }
      case "Backspace": {
        if (content?.length > 0) {
          break;
        }
        const grandParentBlockId =
          note?.blocks.find((f) => f.blockId === parentBlockId)
            ?.parentBlockId || "";

        dispatch(
          addNoteBlock({ noteId, block: getNewBlock("", grandParentBlockId) })
        );
        event.stopPropagation();
        event.preventDefault();
        break;
      }
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
    const childBlocks =
      note?.blocks?.filter((f) => f.parentBlockId === blockId) || [];
    setChildBlocks(childBlocks);
  }, [note, blockId]);
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
    if (isLatest) {
      setIsFocused(true);
    }
  }, [isLatest]);

  return (
    <ListItem id={blockId} w="100%">
      <Flex>
        <Text mr={2}>•</Text>
        <Input
          variant="unstyled"
          style={{ display: !isFocused ? "none" : "" }}
          value={content}
          onChange={handleChange}
          onFocus={() => toggleIsFocused(true)}
          onBlur={() => toggleIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="..."
        />
        <Text
          w="100%"
          cursor={"text"}
          display={isFocused ? "none" : ""}
          onClick={(event) => {
            if ((event.target as HTMLAnchorElement).tagName === "A") {
              return;
            }
            toggleIsFocused(true);
          }}
        >
          {content?.length > 0 ? transform(content) : "..."}
        </Text>
      </Flex>
      {childBlocks ? (
        <Box pl={4}>
          <BlocksList noteId={noteId} blocks={childBlocks} />
        </Box>
      ) : null}
    </ListItem>
  );
}
