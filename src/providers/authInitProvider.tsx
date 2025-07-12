import type { ReactNode } from "react";
import useAuthInit from "../hooks/authInit";

export default function AuthInitProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoading } = useAuthInit();

  if (isLoading) return null; // ou un spinner

  return <>{children}</>;
}
