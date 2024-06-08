import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | Reset-password",
  };

export default function ResetPasswordPageLayout({
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