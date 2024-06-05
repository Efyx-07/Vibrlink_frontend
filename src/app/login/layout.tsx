import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | Login",
  };

export default function LoginPageLayout({
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