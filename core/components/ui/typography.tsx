"use client";

import cn from "@/core/utils/cn";
import { Typography } from "antd";
import { CSSProperties } from "react";

const { Title: AntdTitle, Text: AntdText, Paragraph: AntdParagraph } = Typography;

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "body3"
  | "body4"
  | "caption"
  | "overline"
  | "normal14"
  | "normal16"
  | "bold14"
  | "bold16";

export type TitleProps = Omit<React.ComponentPropsWithRef<typeof AntdTitle>, "level"> & {
  variant?: TypographyVariant;
  as?: Extract<TypographyVariant, "h1" | "h2" | "h3" | "h4" | "h5">;
};

export type TextProps = React.ComponentPropsWithRef<typeof AntdText> & {
  variant?: TypographyVariant;
};

export type ParagraphProps = React.ComponentPropsWithRef<typeof AntdParagraph> & {
  variant?: TypographyVariant;
};

const mapVariantSize: Record<
  TypographyVariant,
  Pick<CSSProperties, "fontSize" | "lineHeight" | "fontWeight" | "letterSpacing">
> = {
  h1: {
    fontSize: "48px",
    lineHeight: "64px",
    fontWeight: "700"
  },
  h2: {
    fontSize: "32px",
    lineHeight: "48px",
    fontWeight: "700"
  },

  h3: {
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "700"
  },
  h4: {
    fontSize: "20px",
    lineHeight: "30px",
    fontWeight: "700"
  },
  h5: {
    fontSize: "18px",
    lineHeight: "28px",
    fontWeight: "700"
  },
  subtitle1: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "600"
  },
  subtitle2: {
    fontSize: "14px",
    lineHeight: "22px",
    fontWeight: "600"
  },
  body1: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "500"
  },
  body2: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "500"
  },
  body3: {
    fontSize: "13px",
    lineHeight: "19.5px",
    fontWeight: "400"
  },
  body4: {
    fontSize: "11px",
    lineHeight: "20px",
    fontWeight: "400"
  },
  caption: {
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "500"
  },
  overline: {
    fontSize: "12px",
    lineHeight: "18px",
    fontWeight: "700",
    letterSpacing: "1.2px"
  },
  normal14: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "400"
  },
  normal16: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "400"
  },
  bold14: {
    fontSize: "14px",
    lineHeight: "24px",
    fontWeight: "700"
  },
  bold16: {
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: "700"
  },
} as const;

const mapTitleTag: Record<Extract<TypographyVariant, "h1" | "h2" | "h3" | "h4" | "h5">, number> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5
} as const;

function Title({ children, style, variant, as, ...props }: TitleProps) {
  return (
    <AntdTitle
      level={mapTitleTag[as ?? "h3"] as any}
      style={{ ...style, ...mapVariantSize[variant ?? "h3"] }}
      {...props}
    >
      {children}
    </AntdTitle>
  );
}

function Paragraph({ children, className, style, variant, ...props }: ParagraphProps) {
  return (
    <AntdParagraph
      className={cn("!mb-0", className)}
      style={{ ...style, ...mapVariantSize[variant ?? "body1"] }}
      {...props}
    >
      {children}
    </AntdParagraph>
  );
}

function Text({ children, className, style, variant, ...props }: TextProps) {
  return (
    <AntdText
      className={cn("inline-block", className)}
      style={{ ...style, ...mapVariantSize[variant ?? "body1"] }}
      {...props}
    >
      {children}
    </AntdText>
  );
}

export { Title, Text, Paragraph };
