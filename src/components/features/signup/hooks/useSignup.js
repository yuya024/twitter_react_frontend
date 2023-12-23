import axios from "axios";
import { signup } from "../../../../common/urls";

export const useSignup = () => {
  const postSignup = (params) => {
    return axios
      .post(signup, {
        name: params.name,
        email: params.email,
        password: params.password,
        password_confirmation: params.passwordConfirmation,
        confirm_success_url: "http://localhost:3001/",
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };
  return { postSignup };
};
