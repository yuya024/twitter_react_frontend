import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { Loading } from "../../common/components/Loading";
import { useMessageIndex } from "../features/message/hooks/useMessageIndex";
import { userState } from "../../common/store/userState";
import { useCreateMessage } from "../features/message/hooks/useCreateMessage";

export const Message = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useRecoilValue(userState);
  const { messageDateFormat, getMessage } = useMessageIndex();
  const { postMessage } = useCreateMessage();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const res = await getMessage(id);
      setMessages(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const submitMessage = async () => {
    const form = { id: id, content: inputMessage };
    try {
      await postMessage(form);
      setInputMessage("");
      init();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="h-screen flex flex-col">
            <div className="px-4 py-2 border-b flex w-full">
              <p className="font-bold">{state.partner_name}</p>
            </div>
            <div className="mt-2 flex-1 overflow-y-scroll">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`${
                    user.id === message.user_id
                      ? "mr-2 justify-end ml-auto"
                      : "ml-2"
                  } mb-2 flex`}
                >
                  <div>
                    <div
                      className={`${
                        user.id === message.user_id
                          ? "bg-sky-400 text-white rounded-bl-2xl"
                          : "bg-gray-200 rounded-br-2xl"
                      } rounded-t-2xl px-4 py-3`}
                      style={{ maxWidth: "28vw" }}
                    >
                      {message.content
                        .split("\n")
                        .map((text, i) =>
                          text !== "" ? <p key={i}>{text}</p> : <br key={i} />
                        )}
                    </div>
                    <p className="text-xs flex justify-end text-gray-500">
                      {messageDateFormat(message.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="border-t p-2 grid grid-cols-10"
              style={{ width: "37vw" }}
            >
              <div className="col-start-1 col-end-10 mr-1">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  placeholder="新しいメッセージを作成"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="p-2 bg-gray-200 rounded block w-full outline-none resize-none text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <div>
                <button onClick={submitMessage} disabled={inputMessage === ""}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5"
                    style={{ color: "rgb(29, 155, 240)" }}
                  >
                    <g>
                      <path d="M2.504 21.866l.526-2.108C3.04 19.719 4 15.823 4 12s-.96-7.719-.97-7.757l-.527-2.109L22.236 12 2.504 21.866zM5.981 13c-.072 1.962-.34 3.833-.583 5.183L17.764 12 5.398 5.818c.242 1.349.51 3.221.583 5.183H10v2H5.981z"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
