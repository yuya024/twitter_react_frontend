import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";

import { useTweetPosting } from "../features/tweetPosting/hooks/useTweetPosting";
import { TweetForm } from "../features/tweetPosting/components/TweetForm";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { TweetList } from "../features/displayTweet/components/TweetList";
import { Pagination } from "../../common/components/Pagination";
import { useRecoilValue } from "recoil";
import { userState } from "../../common/store/userState";
import { usePostingComment } from "../features/postingComment/hooks/usePostingComment";
import { CommentModal } from "../features/postingComment/components/CommentModal";
import { usePostingRetweet } from "../features/postingRetweet/hooks/usePostingRetweet";

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
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const session = useRecoilValue(userState);
  const navigate = useNavigate();
  const { postRetweet } = usePostingRetweet();
  const {
    commentValue,
    setCommentValue,
    replyToTweet,
    setReplyToTweet,
    changeComment,
    createCommentParams,
    postComment,
  } = usePostingComment();

  ReactModal.setAppElement("#root");
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0px",
      transform: "translate(-50%, -50%)",
      width: "600px",
      maxWidth: "600px",
    },
  };

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

  const redirectProfile = (e, target) => {
    e.preventDefault();
    navigate(target);
  };

  const openCommentModal = (e, commetTweetId) => {
    e.preventDefault();
    setReplyToTweet(...tweets.filter((tweet) => tweet.id === commetTweetId));
    setIsCommentOpen(true);
  };

  const closeCommentModal = () => {
    setIsCommentOpen(false);
    setReplyToTweet(null);
    setCommentValue("");
  };

  const submitComment = async (e) => {
    e.preventDefault();
    const params = createCommentParams();
    try {
      const res = await postComment(params);
      setTweets(res.data);
      setPaginate(res.pagination);
      closeCommentModal();
      toast.success("コメントを投稿しました");
    } catch (e) {
      toast.error("コメントの投稿に失敗しました");
      console.log(e);
    }
  };

  const submitRetweet = async (e, tweet_id) => {
    e.preventDefault();
    try {
      await postRetweet(tweet_id);
      init();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <Toaster />
      </div>

      <ReactModal isOpen={isCommentOpen} style={customStyles}>
        <CommentModal
          replyToTweet={replyToTweet}
          session={session}
          commentValue={commentValue}
          closeCommentModal={closeCommentModal}
          tweetDateFormat={tweetDateFormat}
          changeComment={changeComment}
          submitComment={submitComment}
        />
      </ReactModal>

      <TweetForm
        textValue={textValue}
        image={image}
        changeInput={changeInput}
        changeImage={changeImage}
        submitDisabled={submitDisabled}
        submitForm={submitForm}
      />

      <TweetList
        tweets={tweets}
        tweetDateFormat={tweetDateFormat}
        openCommentModal={openCommentModal}
        redirectProfile={redirectProfile}
        submitRetweet={submitRetweet}
      />

      <Pagination paginate={paginate} pageChange={pageChange} />
    </>
  );
};
