import axios from "axios";

import { session } from "../urls";

export const useUser = () => {
  const getCurrentUser = () => {
    if (
      !localStorage.getItem("uid") ||
      !localStorage.getItem("client") ||
      !localStorage.getItem("access-token")
    )
      return;

    return axios
      .get(session, {
        headers: {
          uid: localStorage.getItem("uid"),
          client: localStorage.getItem("client"),
          "access-token": localStorage.getItem("access-token"),
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        return e;
      });
  };

  const authHeader = {
    uid: localStorage.getItem("uid"),
    client: localStorage.getItem("client"),
    "access-token": localStorage.getItem("access-token"),
  };

  return { getCurrentUser, authHeader };
};
