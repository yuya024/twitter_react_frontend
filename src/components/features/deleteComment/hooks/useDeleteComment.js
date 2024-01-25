import axios from "axios";
import { useState } from "react";

import { comment } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useDeleteComment = () => {
  const { authHeader } = useUser();
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [isCommentDeleteOpen, setIsCommentDeleteOpen] = useState(false);

  const openCommentDeleteModal = (comment_id) => {
    setIsCommentDeleteOpen(true);
    setDeleteCommentId(comment_id);
  };

  const closeCommentDeleteModal = () => {
    setIsCommentDeleteOpen(false);
    setDeleteCommentId(null);
  };

  const sendDeleteComment = (params) => {
    return axios
      .delete(`${comment}/${params}`, {
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
    deleteCommentId,
    setDeleteCommentId,
    isCommentDeleteOpen,
    setIsCommentDeleteOpen,
    openCommentDeleteModal,
    closeCommentDeleteModal,
    sendDeleteComment,
  };
};
