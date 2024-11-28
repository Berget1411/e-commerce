import RequireAuth from "@/components/auth/require-auth";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </RequireAuth>
  );
}
