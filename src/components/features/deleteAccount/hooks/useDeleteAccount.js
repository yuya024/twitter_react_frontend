import axios from "axios";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import { withdrawal } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";
import { useNavigate } from "react-router-dom";
import { userState } from "../../../../common/store/userState";

export const useDeleteAccount = () => {
  const setSession = useSetRecoilState(userState);
  const [isOpenAccountModal, setIsOpenAccountModal] = useState(false);
  const { authHeader } = useUser();
  const navigate = useNavigate();

  const hundleAccountDeletion = async () => {
    try {
      await deleteAccountRequest();
      setSession({});
      localStorage.clear();
      setIsOpenAccountModal(false);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAccountRequest = () => {
    return axios
      .delete(withdrawal, {
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

  return { isOpenAccountModal, setIsOpenAccountModal, hundleAccountDeletion };
};
