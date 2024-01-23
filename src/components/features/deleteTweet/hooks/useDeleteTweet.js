import axios from "axios";
import { useState } from "react";

import { tweet } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useDeleteTweet = () => {
  const [deleteTweetId, setDeleteTweetId] = useState(null);
  const { authHeader } = useUser();

  const putDeleteTweet = (params) => {
    return axios
      .delete(`${tweet}/${params}`, {
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

  return { deleteTweetId, setDeleteTweetId, putDeleteTweet };
};
