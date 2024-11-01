import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <div>
      <Button variant={"outline"} className="flex h-14 w-full gap-2">
        <FaGoogle />
        <span>Google</span>
      </Button>
    </div>
  );
}
