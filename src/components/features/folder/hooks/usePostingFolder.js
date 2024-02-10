import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { folder } from "../../../../common/urls";

export const usePostingFolder = () => {
  const { authHeader } = useUser();

  const postFolder = (folderName) => {
    return axios
      .post(
        folder,
        {
          name: folderName,
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

  return { postFolder };
};
