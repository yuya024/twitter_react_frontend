import axios from "axios";

import { useUser } from "../../../../common/hooks/useUser";
import { folder } from "../../../../common/urls";

export const useFolderIndex = () => {
  const { authHeader } = useUser();

  const folderDateFormat = (date) => {
    date = new Date(date);
    return (date =
      date.getFullYear() +
      "年" +
      ((date.getMonth() % 12) + 1) +
      "月" +
      date.getDate() +
      "日");
  };

  const getFolder = () => {
    return axios
      .get(folder, {
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

  return { folderDateFormat, getFolder };
};
