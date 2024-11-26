"use client";
import { useState } from "react";
import { LuSearch, LuUser, LuShoppingCart, LuHeart } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Drawer from "@/components/ui/drawer";
import SearchInput from "./search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/stores/useUserStore";

const tabs = [
  {
    label: "Women",
    href: "/",
  },
  {
    label: "Men",
    href: "/",
  },
  {
    label: "Kids",
    href: "/",
  },
  {
    label: "Sports",
    href: "/",
  },
  {
    label: "Brands",
    href: "/",
  },
  {
    label: "New",
    href: "/",
  },
  {
    label: "Sale",
    href: "/",
  },
];

export default function Navbar() {
  const { user, logout } = useUserStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState<string | false>(false);
  console.log(user);
  return (
    <>
      <header className="max-container sticky top-0 z-30 bg-background">
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="m-0 text-2xl font-bold transition-opacity hover:opacity-80"
          >
            SoleMates
          </Link>
          <SearchInput drawer={false} />
          <div>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setIsDrawerOpen("search")}
            >
              <LuSearch />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen("cart")}
            >
              <LuShoppingCart />
            </Button>
            <Button variant="ghost" size="icon">
              <Link href="/home/liked">
                <LuHeart />
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LuUser />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {user ? (
                  <>
                    <DropdownMenuItem>
                      <Link href="/account" className="w-full">
                        Account
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem>
                        <Link href="/admin" className="w-full">
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => logout()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link href="/auth/login" className="w-full">
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/auth/signup" className="w-full">
                        Sign Up
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-4 pb-8">
          {tabs.map((tab) => (
            <Link
              href={tab.href}
              key={tab.label}
              className={cn(
                "text-sm font-semibold transition-opacity hover:opacity-80",
                tab.label === "Sale" && "text-red-500",
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </header>
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen === "search"}
          onClose={() => setIsDrawerOpen(false)}
        >
          <div className="p-4">
            <SearchInput drawer={true} />
          </div>
        </Drawer>
      )}
      {isDrawerOpen && (
        <Drawer
          isOpen={isDrawerOpen === "cart"}
          onClose={() => setIsDrawerOpen(false)}
        >
          <div className="p-4">Cart</div>
        </Drawer>
      )}
    </>
  );
}
