import { FaRegCircleCheck } from "react-icons/fa6";

export default function FormSuccess({
  message,
}: {
  message: string | undefined;
}) {
  return (
    message !== undefined &&
    message !== "" && (
      <div className="flex w-full items-center gap-x-2 rounded-lg bg-emerald-600/15 p-3">
        <FaRegCircleCheck className="success-color h-5 w-5" />
        <p className="success-color text-sm">{message}</p>
      </div>
    )
  );
}
