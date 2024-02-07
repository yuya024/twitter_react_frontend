import axios from "axios";

import { group } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useCreateGroup = () => {
  const { authHeader } = useUser();

  const postGroup = (partner_id) => {
    return axios
      .post(
        group,
        {
          partner_id: partner_id,
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

  return { postGroup };
};
