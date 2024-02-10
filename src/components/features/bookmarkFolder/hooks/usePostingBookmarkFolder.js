import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { folder } from "../../../../common/urls";

export const usePostingBookmarkFolder = () => {
  const { authHeader } = useUser();

  const postBookmarkAddFolder = (params) => {
    const { folderId, bookmarkId } = params;
    return axios
      .post(
        `${folder}/${folderId}/bookmark_folders`,
        { bookmark_id: bookmarkId },
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

  return { postBookmarkAddFolder };
};
