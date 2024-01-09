import axios from "axios";

import { signin } from "../../../../common/urls";

export const useSignin = () => {
  const postSignin = (params) => {
    return axios
      .post(signin, {
        email: params.email,
        password: params.password,
      })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
  };

  return { postSignin };
};
