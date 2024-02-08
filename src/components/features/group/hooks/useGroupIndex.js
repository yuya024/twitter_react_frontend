import axios from "axios";

import { group } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useGroupIndex = () => {
  const { authHeader } = useUser();

  const groupDateFormat = (jsonDate) => {
    const date = new Date(jsonDate);
    return `${date.getFullYear()}年${
      (date.getMonth() % 12) + 1
    }月${date.getDate()}日`;
  };

  const getGroup = () => {
    return axios
      .get(group, {
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

  return { groupDateFormat, getGroup };
};
