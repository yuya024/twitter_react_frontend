import { Link, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import "./App.css";

import { Signup } from "./components/pages/signup";
import { EmailConfirm } from "./components/pages/EmailConfirm";
import { Top } from "./components/pages/Top";
import { Signin } from "./components/pages/Signin";
import { Home } from "./components/pages/Home";
import { useUser } from "./common/hooks/useUser";
import { useEffect } from "react";
import { userState } from "./common/store/userState";
import { Layout } from "./components/pages/Layout";
import { TweetDetail } from "./components/pages/TweetDetail";
import { Profile } from "./components/pages/Profile";
import { Notification } from "./components/pages/Notification";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const { getCurrentUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const res = await getCurrentUser();
      if (res && res.is_login) {
        setUser({ is_login: true, user: res.data });
      } else {
        navigate("/users/sign_in", { replace: true });
      }
    };
    init();
  }, []);

  const RouteLoginGuard = () => {
    return user.is_login ? <Outlet /> : null;
  };

  return (
    <>
      {!user.is_login && (
        <header className="border-b-2 border-indigo-300">
          <div className="container flex mx-auto p-4">
            <span className="font-medium text-xl">Twitter clone</span>
            <nav className="ml-auto">
              <Link
                to="/users/sign_in"
                className="mr-5 hover:text-blue-200 duration-200"
              >
                ログイン
              </Link>
              <Link to="/users" className="hover:text-blue-200 duration-200">
                新規登録
              </Link>
            </nav>
          </div>
        </header>
      )}

      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/users" element={<Signup />} />
        <Route path="/users/email_confirm" element={<EmailConfirm />} />
        <Route path="/users/sign_in" element={<Signin />} />

        <Route element={<RouteLoginGuard />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/tweets">
              <Route path=":id" element={<TweetDetail />} />
            </Route>
            <Route path="/users">
              <Route path=":id" element={<Profile />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
