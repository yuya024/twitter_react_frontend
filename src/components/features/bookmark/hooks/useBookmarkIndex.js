import axios from "axios";

import { bookmark } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useBookmarkIndex = () => {
  const { authHeader } = useUser();

  const getBookmark = (page) => {
    return axios
      .get(`${bookmark}?page=${page ?? 1}`, {
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

  return { getBookmark };
};
