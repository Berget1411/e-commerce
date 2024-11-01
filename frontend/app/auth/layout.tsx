export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full h-screen items-center justify-center">
      {children}
    </div>
  );
}
