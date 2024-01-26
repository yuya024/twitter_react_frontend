import axios from "axios";
import { useState } from "react";

import { tweet } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useDeleteTweet = () => {
  const [deleteTweetId, setDeleteTweetId] = useState(null);
  const [isTweetDeleteOpen, setIsTweetDeleteOpen] = useState(false);
  const { authHeader } = useUser();

  const openTweetDeleteModal = (tweet_id) => {
    setIsTweetDeleteOpen(true);
    setDeleteTweetId(tweet_id);
  };

  const closeTweetDeleteModal = () => {
    setIsTweetDeleteOpen(false);
    setDeleteTweetId(null);
  };

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

  return {
    deleteTweetId,
    setDeleteTweetId,
    isTweetDeleteOpen,
    setIsTweetDeleteOpen,
    openTweetDeleteModal,
    closeTweetDeleteModal,
    putDeleteTweet,
  };
};
