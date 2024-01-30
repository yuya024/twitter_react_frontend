import axios from "axios";

import { user } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useDeleteFollow = () => {
  const { authHeader } = useUser();

  const deleteFollow = (userId) => {
    return axios
      .delete(`${user}/${userId}/unfollow`, {
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

  return { deleteFollow };
};
