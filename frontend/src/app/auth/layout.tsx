import AuthGuard from "@/components/auth/auth-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </AuthGuard>
  );
}
