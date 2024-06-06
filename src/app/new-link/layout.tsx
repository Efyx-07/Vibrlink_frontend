import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | New link",
  };

export default function NewLinkPageLayout({
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