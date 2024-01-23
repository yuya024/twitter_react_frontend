import axios from "axios";

import { comment } from "../../../../common/urls";
import { useState } from "react";

import { useUser } from "../../../../common/hooks/useUser";

export const usePostingComment = () => {
  const [commentValue, setCommentValue] = useState("");
  const [replyToTweet, setReplyToTweet] = useState(null);
  const { authHeader } = useUser();

  const changeComment = (e) => {
    setCommentValue(e.target.value);
  };

  const createCommentParams = () => {
    return {
      tweet_id: replyToTweet.id,
      content: commentValue,
    };
  };

  const postComment = (params) => {
    return axios
      .post(comment, params, {
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
    commentValue,
    setCommentValue,
    replyToTweet,
    setReplyToTweet,
    changeComment,
    createCommentParams,
    postComment,
  };
};
