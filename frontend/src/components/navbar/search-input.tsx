"use client";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
export default function SearchInput({ drawer }: { drawer: boolean }) {
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(search);
  };
  return (
    <form
      action=""
      onSubmit={handleSearch}
      className={cn("w-full", !drawer && "max-w-xs max-sm:hidden")}
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
  );
}
