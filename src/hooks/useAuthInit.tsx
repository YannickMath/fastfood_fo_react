import { useCheckAuthenticationQuery } from "../services/checkAuthentication";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthenticated, logout } from "../redux/reducers/authSlice";

export default function useAuthInit() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");

  const { data, isLoading, isError } = useCheckAuthenticationQuery(undefined, {
    skip: !token,
  });
  useEffect(() => {
    if (!token) {
      dispatch(setAuthenticated(false));
      dispatch(logout());
      return;
    }

    if (data) {
      dispatch(setAuthenticated(true));
    } else if (isError) {
      dispatch(setAuthenticated(false));
      dispatch(logout());
    }
  }, [data, isError, dispatch, token]);

  return { isLoading };
}
