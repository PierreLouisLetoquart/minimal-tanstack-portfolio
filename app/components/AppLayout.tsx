export function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-roboto bg-background text-foreground antialiased px-6">
      <div className="max-w-[69ch] mx-auto">{children}</div>
    </main>
  );
}
