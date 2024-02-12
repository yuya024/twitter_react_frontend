import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { bookmark } from "../../../../common/urls";

export const useDeleteBookmark = () => {
  const { authHeader } = useUser();

  const deleteBookmark = (bookmarkId) => {
    return axios
      .delete(`${bookmark}/${bookmarkId}`, {
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

  return { deleteBookmark };
};
