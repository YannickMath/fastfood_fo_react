interface LoaderProps {
  size?: "s" | "m" | "l" | "xl";
  message: string;
}

export default function Loader({ size = "m", message }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span
        className={`loading loading-spinner loading-${size} text-black text-${size}`}
      ></span>
      <p className="text-2xl text-black" aria-label={message}>
        {message}
      </p>
    </div>
  );
}
