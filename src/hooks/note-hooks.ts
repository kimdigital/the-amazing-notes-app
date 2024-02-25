import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getNewBlock } from "../helpers/block-helpers";
import { setBlocks } from "../slices/block-slice";

export function useNavigateNote() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notes = useAppSelector((state) => state.note);

  return function (id: string) {
    let matchingBlocks = notes.find((f) => f.id === id)?.blocks || [];

    if (matchingBlocks?.length === 0) {
      matchingBlocks = [getNewBlock("Hello World!")];
    }

    dispatch(setBlocks(matchingBlocks));

    navigate(`/notes/${id}`);
  };
}
