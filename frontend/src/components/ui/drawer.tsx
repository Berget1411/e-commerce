import { motion } from "framer-motion";
import { Button } from "./button";
import { LuX } from "react-icons/lu";

export default function Drawer({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0" : "100%" }}
        exit={{ x: "100%" }}
        transition={{ bounce: false }}
        className="fixed bottom-0 right-0 top-0 z-50 w-full max-w-md bg-background"
      >
        <div className="flex items-center justify-end p-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <LuX className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </motion.div>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
    </>
  );
}
