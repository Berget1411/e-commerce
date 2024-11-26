import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchInput from "./search-input";
import { Button } from "@/components/ui/button";
import { LuSearch } from "react-icons/lu";
export default function NavSearch() {
  return (
    <Sheet>
      <SheetTrigger asChild className="sm:hidden">
        <Button variant="ghost" size="icon" className="relative">
          <LuSearch className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:hidden">
        <SearchInput drawer={true} />
      </SheetContent>
    </Sheet>
  );
}
