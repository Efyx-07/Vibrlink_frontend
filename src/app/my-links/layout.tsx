import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | My links",
  };

export default function MyLinksPageLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div>
        {children}
      </div>
    );
}