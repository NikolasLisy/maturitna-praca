export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center min-h-screen items-center p-10">
      <div className="bg-white p-10 rounded-md shadow-sm">{children}</div>
    </div>
  );
}
