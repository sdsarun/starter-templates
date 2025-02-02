"use client";

import cn from "@/core/utils/cn";
import { theme } from "antd";
import React from "react";

export type SurfaceVariant = "page-content" | "plain";
export type SurfaceProps = React.ComponentProps<"div"> & {
  variant?: SurfaceVariant;
};

const mapVariantSurface: Record<SurfaceVariant, string> = {
  "page-content": "p-4 h-full",
  plain: ""
};

export default function Surface({ children, className, style, variant, ...props }: SurfaceProps) {
  const { token } = theme.useToken();

  return (
    <div
      className={cn(mapVariantSurface[variant ?? "page-content"], className)}
      style={{
        backgroundColor: token.colorBgContainer,
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
}
