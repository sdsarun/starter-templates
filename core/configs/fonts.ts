import { Noto_Sans, Noto_Sans_Thai, Noto_Sans_Mono } from "next/font/google";

const notoSans = Noto_Sans({
  preload: true,
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansThai = Noto_Sans_Thai({
  preload: true,
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  preload: true,
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export { notoSans, notoSansThai, notoSansMono };
