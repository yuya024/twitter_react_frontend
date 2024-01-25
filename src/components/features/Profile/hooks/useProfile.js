import axios from "axios";
import { useState } from "react";

import { profile, user } from "../../../../common/urls";
import { useUser } from "../../../../common/hooks/useUser";

export const useProfile = () => {
  const [editProfile, setEditProfile] = useState(user);
  const { authHeader } = useUser();

  const dateUsed = (jsonDate) => {
    const date = new Date(jsonDate);
    return `${date.getFullYear()}年${
      (date.getMonth() % 12) + 1
    }月からTwitterを利用しています`;
  };

  const birthdateFormat = (jsonDate) => {
    const date = new Date(jsonDate);
    return `誕生日: ${(date.getMonth() % 12) + 1}月${date.getDate()}日`;
  };

  const birthdateForm = (jsonDate) => {
    const date = new Date(jsonDate);
    const monthFilledZero = (date.getMonth() % 12) + 1 < 10 ? "0" : "";
    const dateFilledZero = date.getDate() < 10 ? "0" : "";
    return `${date.getFullYear()}-${monthFilledZero}${
      (date.getMonth() % 12) + 1
    }-${dateFilledZero}${date.getDate()}`;
  };

  const changeImage = (e) => {
    const { name, files } = e.target;
    setEditProfile({ ...editProfile, [name]: files[0] });
  };

  const changeEditProfile = (e) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const createForm = (editProfile) => {
    const form = new FormData();
    for (const [key, value] of Object.entries(editProfile)) {
      form.append(`${key}`, value);
    }
    return form;
  };

  const getProfile = (params) => {
    const { id, page, isComment } = params;
    const body = {
      ...(page ? { page: page } : { page: 1 }),
      ...(isComment ? { is_comment: isComment } : {}),
    };
    return axios
      .get(
        `${user}/${id}`,
        { params: body },
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

  const updateProfile = (params) => {
    return axios
      .put(profile, params, {
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

  return {
    editProfile,
    setEditProfile,
    dateUsed,
    birthdateFormat,
    birthdateForm,
    changeImage,
    changeEditProfile,
    createForm,
    getProfile,
    updateProfile,
  };
};
