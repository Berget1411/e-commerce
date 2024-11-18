"use client";

import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUserStore();

  useEffect(() => {
    if (!isLoading && user) {
      redirect("/");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return children;
  }

  return null;
}
