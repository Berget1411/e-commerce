import { UserResponse } from "@/types/user";
import { create } from "zustand";
import { loginSchema, signUpSchema } from "@/validation/auth";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import router from "next/router";

type LoginFormFields = z.infer<typeof loginSchema>;
type SignupFormFields = z.infer<typeof signUpSchema>;
interface UserStore {
  user: UserResponse | null;
  isLoading: boolean;
  setUser: (user: UserResponse | null) => void;
  login: (data: LoginFormFields) => Promise<boolean>;
  loginGoogle: () => void;
  signup: (data: SignupFormFields) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),

  login: async (data: LoginFormFields) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const { user, message } = await response.json();

      if (!response.ok) throw new Error(message);

      set({ user });
      toast({
        title: "Success",
        description: message,
      });
      set({ isLoading: false });
      router.reload();
      return true;
    } catch (error) {
      set({ isLoading: false });
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
      return false;
    }
  },

  loginGoogle: () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login/federated/google`;
  },
  signup: async (data: SignupFormFields) => {
    try {
      set({ isLoading: true });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      const { message } = await response.json();
      if (!response.ok) throw new Error(message);

      toast({
        title: "Success",
        description: message,
      });

      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      set({ user: null });
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to logout",
      });
    }
  },

  checkSession: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/status`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        set({ user: null, isLoading: false });
        return;
      }

      const { user } = await response.json();
      set({ user, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },
}));