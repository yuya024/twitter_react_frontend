import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { folder } from "../../../../common/urls";

export const useBookmarkFolderIndex = () => {
  const { authHeader } = useUser();

  const getBookmarkFolder = (params) => {
    const { folderId, isAdd } = params;
    let url = `${folder}/${folderId}/bookmark_folders`;
    if (isAdd !== undefined) {
      url += `?is_add=${isAdd}`;
    }
    return axios
      .get(url, {
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

  return { getBookmarkFolder };
};
