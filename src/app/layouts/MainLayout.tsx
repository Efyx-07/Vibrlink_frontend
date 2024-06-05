export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h1>HEADER</h1>
      <main>{children}</main>
    </>
  );
}