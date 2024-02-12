import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { bookmark } from "../../../../common/urls";

export const usePostingBookmark = () => {
  const { authHeader } = useUser();

  const postBookmark = (tweetId) => {
    return axios
      .post(
        bookmark,
        {
          tweet_id: tweetId,
        },
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

  return { postBookmark };
};
