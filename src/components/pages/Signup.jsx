import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignupForm } from "../features/signup/components/SignupForm";
import { useSignup } from "../features/signup/hooks/useSignup";

export const Signup = () => {
  const initailSignupObj = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const [signupObj, setSigunpObj] = useState(initailSignupObj);
  const [validationError, setValidationError] = useState(false);
  const { postSignup } = useSignup();
  const navigate = useNavigate();

  const changeSignupObj = (e) => {
    const { name, value } = e.target;
    setSigunpObj({
      ...signupObj,
      [name]: value,
    });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    postSignup(signupObj).then((data) => {
      if (data.status === "success") {
        navigate("/users/email_confirm");
      } else {
        setValidationError(true);
      }
    });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          アカウント新規作成
        </h2>
      </div>
      {validationError ? (
        <div className="text-center mt-2 text-red-400 font-bold">
          再入力してください
        </div>
      ) : undefined}

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <SignupForm
            type="name"
            value={signupObj.name}
            changeSignupObj={changeSignupObj}
          >
            名前
          </SignupForm>
          <SignupForm
            type="email"
            value={signupObj.email}
            changeSignupObj={changeSignupObj}
          >
            メールアドレス
          </SignupForm>
          <SignupForm
            type="password"
            value={signupObj.password}
            changeSignupObj={changeSignupObj}
          >
            パスワード（6文字以上で入力してください）
          </SignupForm>
          <SignupForm
            type="passwordConfirmation"
            value={signupObj.passwordConfirmation}
            changeSignupObj={changeSignupObj}
          >
            パスワード（確認）
          </SignupForm>

          <div>
            <button
              type="submit"
              onClick={(e) => onClickSubmit(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
