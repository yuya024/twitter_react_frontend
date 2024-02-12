import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { folder } from "../../../../common/urls";

export const useDeleteFolder = () => {
  const { authHeader } = useUser();

  const deletingFolder = (folderId) => {
    return axios
      .delete(`${folder}/${folderId}`, {
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

  return { deletingFolder };
};
