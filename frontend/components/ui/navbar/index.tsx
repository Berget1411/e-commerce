"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { LuSearch, LuUser, LuShoppingCart, LuHeart } from "react-icons/lu";
import { Button } from "../button";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="flex items-center justify-between p-4">
        <Link
          href="/"
          className="m-0 text-2xl font-bold transition-opacity hover:opacity-80"
        >
          SoleMates
        </Link>
        <form
          action=""
          onSubmit={handleSearch}
          className="w-full max-w-xs max-sm:hidden"
        >
          <div className="relative">
            <LuSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-4"
              aria-label="Search"
            />
          </div>
        </form>
        <div>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <LuSearch />
          </Button>
          <Button variant="ghost" size="icon">
            <LuShoppingCart />
          </Button>
          <Button variant="ghost" size="icon">
            <LuHeart />
          </Button>
          <Button variant="ghost" size="icon">
            <LuUser />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4 p-4">
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
  );
}
