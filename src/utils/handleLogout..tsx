import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";
import { showPopup } from "../redux/reducers/popupSlice";
import { persistor } from "../redux/store";

const useHandleLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    localStorage.removeItem("jwt");
    dispatch(logout());
    dispatch(showPopup("Disconnected successfully!"));
    persistor.purge();
    sessionStorage.clear();
    navigate("/");
  };

  return handleLogout;
};

export default useHandleLogout;
