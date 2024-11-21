"use client";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";
import { useUserStore } from "@/stores/useUserStore";

export default function Social() {
  const { loginGoogle } = useUserStore();
  const handleGoogleLogin = async () => {
    await loginGoogle();
  };

  return (
    <div className="mx-6 flex gap-2">
      <Button
        variant={"outline"}
        className="flex h-14 w-full"
        onClick={handleGoogleLogin}
      >
        <FaGoogle />
      </Button>
      <Button variant={"outline"} className="flex h-14 w-full" disabled>
        <FaFacebook />
      </Button>
    </div>
  );
}
