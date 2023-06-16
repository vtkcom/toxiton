import { createPortal } from "react-dom";
import { Minus } from "./minus.icon";
import { Navigate } from "./navigate.icon";
import { Plus } from "./plus.icon";

export const Sprites: React.FC = () => {
  return createPortal(
    <svg style={{ display: "none" }}>
      <Navigate />
      <Plus />
      <Minus />
    </svg>,
    document.body
  );
};
