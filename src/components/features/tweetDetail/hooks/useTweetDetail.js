import axios from "axios";
import { tweet } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useTweetDetail = () => {
  const { authHeader } = useUser();

  const tweetDetailDateFormat = (jsonDate) => {
    const date = new Date(jsonDate);
    const filledZero = date.getMinutes() < 10 ? "0" : "";
    const ampmHours =
      date.getHours() < 13
        ? `午前${date.getHours()}`
        : `午後${date.getHours() - 12}`;
    return `${ampmHours}:${filledZero}${date.getMinutes()}・${date.getFullYear()}年${
      (date.getMonth() % 12) + 1
    }月${date.getDate()}日`;
  };

  const commentDateFormat = (jsonDate) => {
    const date = new Date(jsonDate);
    return `${date.getFullYear()}/${
      (date.getMonth() % 12) + 1
    }/${date.getDate()}`;
  };

  const getTweetDetail = (params) => {
    const { tweet_id, page } = params;
    return axios
      .get(`${tweet}/${tweet_id}/comments?page=${page ?? 1}`, {
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

  return { getTweetDetail, tweetDetailDateFormat, commentDateFormat };
};
