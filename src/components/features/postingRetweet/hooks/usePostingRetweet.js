import axios from "axios";

import { tweet } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const usePostingRetweet = () => {
  const { authHeader } = useUser();

  const postRetweet = (tweetId) => {
    return axios
      .post(
        `${tweet}/${tweetId}/retweets`,
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

  return { postRetweet };
};
