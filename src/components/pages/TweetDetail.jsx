import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTweetDetail } from "../features/tweetDetail/hooks/useTweetDetail";
import { TweetDetailItem } from "../features/tweetDetail/components/TweetDetailItem";
import { Loading } from "../../common/components/Loading";

export const TweetDetail = () => {
  const { id } = useParams();
  const { tweetDetailDateFormat, getTweetDetail } = useTweetDetail();
  const [tweet, setTweet] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      try {
        const res = await getTweetDetail(id);
        setTweet(res.data);
        setIsLoading(false);
      } catch (e) {
        console.log("データを取得できません");
      }
    };
    init();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="flex my-2 items-center">
            <div className="mx-4" onClick={goBack}>
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                style={{ color: "rgb(15, 20, 25)" }}
                className="h-5 w-5"
              >
                <g>
                  <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                </g>
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-xl">ポストする</h2>
            </div>
          </div>

          <TweetDetailItem
            tweet={tweet}
            tweetDetailDateFormat={tweetDetailDateFormat}
          />
        </>
      )}
    </>
  );
};
