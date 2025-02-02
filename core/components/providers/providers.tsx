import React from "react";
import ThemeProvider from "@/core/components/providers/theme";

export type ProvidersProps = React.PropsWithChildren;

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
