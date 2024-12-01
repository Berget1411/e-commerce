import { LuHeart } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

import SearchInput from "./search-input";
import NavCart from "./nav-cart";
import UserButton from "./user-button";
import NavSearch from "./nav-search";
import BrandsMenu from "./brands-menu";
import { NAV_TABS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="max-container sticky top-0 z-30 bg-transparent">
      <div className="flex items-center justify-between py-4">
        <Link
          href="/"
          className="m-0 text-2xl font-bold transition-opacity hover:opacity-80"
        >
          SoleMates
        </Link>
        <SearchInput drawer={false} />
        <div>
          <NavSearch />
          <NavCart />
          <Button variant="ghost" size="icon">
            <Link href="/home/liked">
              <LuHeart />
            </Link>
          </Button>
          <UserButton />
        </div>
      </div>
      <div className="flex items-center gap-4 pb-8">
        {NAV_TABS.map((tab) => (
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
        <BrandsMenu />
      </div>
    </header>
  );
}
