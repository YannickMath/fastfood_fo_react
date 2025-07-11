import { useCheckAuthenticationQuery } from "../services/checkAuthentication";

export default function useIsUserConnected() {
  const { data, isLoading, isError } = useCheckAuthenticationQuery();
  return {
    isUserConnected: Boolean(data),
    isLoading,
    isError,
  };
}
