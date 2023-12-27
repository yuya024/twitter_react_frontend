import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { SigninForm } from "../features/signin/components/SigninForm";
import { useSignin } from "../features/signin/fooks/useSignin";
import { userState } from "../../common/store/userState";

export const Signin = () => {
  const initailSigninObj = {
    email: "",
    password: "",
  };
  const [signinObj, setSigninObj] = useState(initailSigninObj);
  const [validationError, setValidationError] = useState(false);
  const { postSignin } = useSignin();
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const changeSigninObj = (e) => {
    const { name, value } = e.target;
    setSigninObj({
      ...signinObj,
      [name]: value,
    });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();

    postSignin(signinObj).then((data) => {
      if (data.status === 200) {
        localStorage.setItem("uid", data.headers["uid"]);
        localStorage.setItem("client", data.headers["client"]);
        localStorage.setItem("access-token", data.headers["access-token"]);

        setUser({ is_login: true, user: data.data.data });

        navigate("/home");
      } else {
        setValidationError(true);
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          ログイン
        </h2>
      </div>
      {validationError ? (
        <div className="text-center mt-2 text-red-400 font-bold">
          再入力してください
        </div>
      ) : undefined}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <SigninForm
            type="email"
            value={signinObj.email}
            changeSigninObj={changeSigninObj}
          >
            メールアドレス
          </SigninForm>
          <SigninForm
            type="password"
            value={signinObj.password}
            changeSigninObj={changeSigninObj}
          >
            パスワード
          </SigninForm>

          <div>
            <button
              type="submit"
              onClick={(e) => onClickSubmit(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
