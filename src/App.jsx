import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import { Signup } from "./components/pages/signup";
import { EmailConfirm } from "./components/pages/EmailConfirm";
import { Top } from "./components/pages/Top";

function App() {
  return (
    <Router>
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

      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/users" element={<Signup />} />
        <Route path="/users/email_confirm" element={<EmailConfirm />} />
      </Routes>
    </Router>
  );
}

export default App;
