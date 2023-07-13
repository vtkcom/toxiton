import { createPortal } from "react-dom";
import { Minus } from "./minus.icon";
import { Navigate } from "./navigate.icon";
import { Plus } from "./plus.icon";
import { Ton } from "./ton.icon";
import { UA } from "./ua.icon";
import { Back } from "./back.icon";
import { GitHub } from "./github.icon";
import { Power } from "./power.icon";
import { Toxyton } from "./toxyton.icon";
import { Bell } from "./bell.icon";
import { Toncoin } from "./toncoin.icon";

export const Sprites: React.FC = () => {
  return createPortal(
    <svg style={{ display: "none" }}>
      <Navigate />
      <Plus />
      <Minus />
      <Ton />
      <UA />
      <Back />
      <GitHub />
      <Power />
      <Toxyton />
      <Bell />
      <Toncoin />
    </svg>,
    document.body
  );
};
