import authService from "@/appwrite/auth";
import { toast } from "react-toastify";
import { authSlice } from "./authSlice";
const { actions } = authSlice;

export const login = (data) => (dispatch) => {
  return authService
    .login(data)
    .then((loginData) => {
      console.log("loginData", loginData);
      if (loginData) {
        return authService
          .getCurrentUser()
          .then((currUser) => {
            console.log("currUser", currUser);
            dispatch(actions.login(currUser));
            return currUser;
          })
          .catch((error) => {
            console.log("Error WHile Getting Current User", error);
            toast.error(error.message);
          });
      } else {
        console.log("Error while loggin in");
        toast.error("Something Went Wrong");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
