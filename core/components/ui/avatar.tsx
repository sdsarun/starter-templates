"use client";

import cn from "@/core/utils/cn";
import { Avatar as AntdAvatar } from "antd";

export type AvatarProps = React.ComponentPropsWithRef<typeof AntdAvatar>;

export default function Avatar({ rootClassName, ...props }: AvatarProps) {
  return (
    <AntdAvatar
      rootClassName={cn("!bg-pl-secondary", rootClassName)}
      {...props}
    />
  );
}
