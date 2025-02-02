import type { ModalProps } from "antd";

export type UIModalProps = Pick<ModalProps, "open" | "onCancel" | "onOk" | "okText">;
export type ModalAction<Payload = Record<string, any>> = {
  open?: boolean;
  payload?: Payload;
};
