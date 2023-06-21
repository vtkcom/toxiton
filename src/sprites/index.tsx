import { createPortal } from "react-dom";
import { Minus } from "./minus.icon";
import { Navigate } from "./navigate.icon";
import { Plus } from "./plus.icon";
import { Ton } from "./ton.icon";
import { UA } from "./ua.icon";

export const Sprites: React.FC = () => {
  return createPortal(
    <svg style={{ display: "none" }}>
      <Navigate />
      <Plus />
      <Minus />
      <Ton />
      <UA />
    </svg>,
    document.body
  );
};
