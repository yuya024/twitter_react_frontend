import axios from "axios";
import { useState } from "react";

import { user } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const usePostFollow = () => {
  const { authHeader } = useUser();
  const [isFollowed, setIsFollowed] = useState();

  const postFollow = (userId) => {
    return axios
      .post(
        `${user}/${userId}/follow`,
        { user_id: userId },
        {
          headers: authHeader,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };

  return { isFollowed, setIsFollowed, postFollow };
};
