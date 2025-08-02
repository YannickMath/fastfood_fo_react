import type { TooltipProps } from "../types/components";
export default function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block">
        <div className="bg-black text-white px-2 py-1 rounded text-sm shadow-md">
          {text}
        </div>
      </div>
    </div>
  );
}
