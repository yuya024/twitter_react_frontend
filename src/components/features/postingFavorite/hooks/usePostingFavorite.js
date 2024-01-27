import axios from "axios";

import { tweet } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const usePostingFavorite = () => {
  const { authHeader } = useUser();

  const postFavorite = (tweetId) => {
    return axios
      .post(
        `${tweet}/${tweetId}/favorites`,
        { tweet_id: tweetId },
        {
          headers: authHeader,
        }
      )
      .then((res) => {
        return res;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  };
  return { postFavorite };
};
