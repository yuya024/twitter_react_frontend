import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { group } from "../../../../common/urls";

export const useMessageIndex = () => {
  const { authHeader } = useUser();

  const messageDateFormat = (jsonDate) => {
    const date = new Date(jsonDate);
    const filledZero = date.getMinutes() < 10 ? "0" : "";
    const ampmHours =
      date.getHours() < 13
        ? `午前${date.getHours()}`
        : `午後${date.getHours() - 12}`;
    return `${date.getFullYear()}年${
      (date.getMonth() % 12) + 1
    }月${date.getDate()}日 ${ampmHours}:${filledZero}${date.getMinutes()}`;
  };

  const getMessage = (id) => {
    return axios
      .get(`${group}/${id}/messages`, {
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

  return { messageDateFormat, getMessage };
};
