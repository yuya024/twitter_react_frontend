import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useTweetPosting } from "../features/tweetPosting/hooks/useTweetPosting";
import { TweetForm } from "../features/tweetPosting/components/TweetForm";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { TweetList } from "../features/displayTweet/components/TweetList";

export const Home = () => {
  const {
    textValue,
    image,
    changeInput,
    changeImage,
    submitDisabled,
    createForm,
    formReset,
    tweetPosting,
  } = useTweetPosting();

  const { tweets, setTweets, tweetDateFormat, getTweet } = useTweetDisplay();
  const [paginate, setPaginate] = useState({});

  useEffect(() => {
    init();
  }, []);

  const init = async (params) => {
    try {
      const res = await getTweet(params);
      setTweets(res.data);
      setPaginate(res.pagination);
    } catch (e) {
      console.log(e);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const form = createForm();
    try {
      await tweetPosting(form);
      toast.success("投稿に成功しました");
      formReset();
      init();
    } catch (error) {
      toast.error("投稿に失敗しました");
    }
  };

  const pageChange = (targetPage) => {
    init(targetPage);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <TweetForm
        textValue={textValue}
        image={image}
        changeInput={changeInput}
        changeImage={changeImage}
        submitDisabled={submitDisabled}
        submitForm={submitForm}
      />
      <TweetList tweets={tweets} tweetDateFormat={tweetDateFormat} />
      <div className="flex justify-center my-4">
        {paginate.previous ? (
          <p
            className="mr-6 font-bold text-gray-700 border-2 rounded-l-md border-gray-400 p-2"
            onClick={() => pageChange(paginate.previous)}
          >
            前へ
          </p>
        ) : null}
        {paginate.next ? (
          <p
            className=" font-bold text-gray-700 border-2 rounded-r-md border-gray-400 p-2"
            onClick={() => pageChange(paginate.next)}
          >
            次へ
          </p>
        ) : null}
      </div>
    </>
  );
};
