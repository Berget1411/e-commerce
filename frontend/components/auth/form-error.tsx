import { TiWarningOutline } from "react-icons/ti";

export default function FormError({
  message,
}: {
  message: string | undefined;
}) {
  return (
    message !== undefined &&
    message !== "" && (
      <div className="flex w-full items-center gap-x-2 rounded-lg bg-rose-600/15 p-3">
        <TiWarningOutline className="danger-color h-5 w-5" />
        <p className="danger-color text-sm">{message}</p>
      </div>
    )
  );
}
