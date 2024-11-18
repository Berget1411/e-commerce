"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import LoadingSpinner from "@/components/ui/loading-spinner";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { checkSession, isLoading } = useUserStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return children;
}
