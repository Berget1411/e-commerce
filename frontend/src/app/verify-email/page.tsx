"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/verify-email/${token}`,
    )
      .then((response) => {
        if (!response.ok) throw new Error("Verification failed");
        return response.json();
      })
      .then(() => setStatus("success"))
      .catch((error) => {
        console.error("Email verification error:", error);
        setStatus("error");
      });
  }, [searchParams]);

  if (status === "loading") {
    return <div>Verifying your email...</div>;
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Verification Failed</h1>
        <p className="mt-2">The verification link is invalid or has expired.</p>
        <Button onClick={() => router.push("/auth/login")} className="mt-4">
          Back to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">Email Verified!</h1>
      <p className="mt-2">Your email has been successfully verified.</p>
      <Button onClick={() => router.push("/auth/login")} className="mt-4">
        Continue to Login
      </Button>
    </div>
  );
}
