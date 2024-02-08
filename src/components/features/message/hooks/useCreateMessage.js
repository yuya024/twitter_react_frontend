import axios from "axios";

import { group } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useCreateMessage = () => {
  const { authHeader } = useUser();

  const postMessage = (props) => {
    const { id, content } = props;

    return axios
      .post(
        `${group}/${id}/messages`,
        {
          content: content,
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
  return { postMessage };
};
