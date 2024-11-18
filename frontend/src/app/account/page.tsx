"use client";
import { useUserStore } from "@/stores/useUserStore";

export default function AccountPage() {
  const { user } = useUserStore();

  return (
    <div>
      <h1>Account Page</h1>
      <p>Username: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}
