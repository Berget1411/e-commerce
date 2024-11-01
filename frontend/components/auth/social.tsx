import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Button } from "../ui/button";

export default function Social() {
  return (
    <div className="mx-6 flex gap-2">
      <Button variant={"outline"} className="flex h-14 w-full">
        <FaGoogle />
      </Button>
      <Button variant={"outline"} className="flex h-14 w-full">
        <FaFacebook />
      </Button>
    </div>
  );
}
