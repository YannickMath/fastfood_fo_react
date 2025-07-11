// utils/navigateToHome.ts
import { useNavigate } from "react-router-dom";

export default function useNavigateToHome() {
  const navigate = useNavigate();

  return () => navigate("/"); // retourne une fonction à appeler
}
