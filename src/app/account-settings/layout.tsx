import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | Account-settings",
  };

export default function AccountSettingsPageLayout({
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