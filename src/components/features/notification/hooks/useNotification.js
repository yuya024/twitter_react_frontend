import axios from "axios";

import { notification } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useNotification = () => {
  const { authHeader } = useUser();

  const getNotification = (page) => {
    return axios
      .get(`${notification}?page=${page ?? 1}`, {
        headers: authHeader,
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  return { getNotification };
};
