import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "VibrLink | Signup",
  };

export default function SignupPageLayout({
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