import axios from "axios";
import { useState } from "react";

import { useUser } from "../../../../common/hooks/useUser";
import { tweet } from "../../../../common/urls";

export const useTweetDisplay = () => {
  const { authHeader } = useUser();
  const [tweets, setTweets] = useState([]);

  const tweetDateFormat = (date) => {
    date = new Date(date);
    if (date.getMinutes() < 10) {
      date =
        date.getFullYear() +
        "-" +
        ((date.getMonth() % 12) + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":0" +
        date.getMinutes();
    } else {
      date =
        date.getFullYear() +
        "-" +
        ((date.getMonth() % 12) + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes();
    }

    return date;
  };

  const getTweet = (params) => {
    return axios
      .get(`${tweet}?page=${params ? params : 1}`, {
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

  return { tweets, setTweets, getTweet, tweetDateFormat };
};
