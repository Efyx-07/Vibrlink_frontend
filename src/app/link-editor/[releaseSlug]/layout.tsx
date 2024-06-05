import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | Link editor",
  };

export default function LinkEditorPageLayout({
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