import type { ReactNode } from "react";
import useAuthInit from "../hooks/useAuthInit";

export default function AuthInitProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoading } = useAuthInit();

  if (isLoading) return <div>Authenticatin in process...</div>;

  return <>{children}</>;
}
