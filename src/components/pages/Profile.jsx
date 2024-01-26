import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../common/store/userState";
import ReactModal from "react-modal";

import { Loading } from "../../common/components/Loading";
import { useProfile } from "../features/Profile/hooks/useProfile";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { Pagination } from "../../common/components/Pagination";
import { MyTweetList } from "../features/Profile/components/myTweetList";
import { ProfileItems } from "../features/Profile/components/ProfileItems";
import { ProfileHeader } from "../features/Profile/components/ProfileHeader";
import { ProfileModal } from "../features/Profile/components/ProfileModal";
import { useDeleteTweet } from "../features/deleteTweet/hooks/useDeleteTweet";
import { DeleteTweetModal } from "../features/deleteTweet/components/DeleteTweetModal";
import { useDeleteComment } from "../features/deleteComment/hooks/useDeleteComment";
import { SelectTweetType } from "../features/Profile/components/SelectTweetType";
import { MyCommentList } from "../features/Profile/components/MyCommentList";
import { DeleteCommentModal } from "../features/deleteComment/components/DeleteCommentModal";

export const Profile = () => {
  const { id } = useParams();
  const [session, setSession] = useRecoilState(userState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const {
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
  } = useProfile();
  const { tweetDateFormat } = useTweetDisplay();
  const {
    deleteTweetId,
    setDeleteTweetId,
    isTweetDeleteOpen,
    setIsTweetDeleteOpen,
    openTweetDeleteModal,
    closeTweetDeleteModal,
    putDeleteTweet,
  } = useDeleteTweet();
  const {
    deleteCommentId,
    setDeleteCommentId,
    isCommentDeleteOpen,
    setIsCommentDeleteOpen,
    openCommentDeleteModal,
    closeCommentDeleteModal,
    sendDeleteComment,
  } = useDeleteComment();

  useEffect(() => {
    init();
  }, [isComment]);

  const init = async (page) => {
    try {
      const res = await getProfile({ id, page, isComment });
      setUser(res.user);
      res.tweets ? setTweets(res.tweets) : setComments(res.comments);
      setPaginate(res.pagination);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const pageChange = (targetPage) => {
    init(targetPage);
  };

  const openModal = () => {
    setIsOpen(true);
    setEditProfile(user);
  };

  const closeModal = () => {
    setIsOpen(false);
    setEditProfile({});
  };

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
      width: `{$isOpen ? "600px" : "300px"}`,
      height: `{$isOpen ? "650px" : "320px}`,
    },
  };

  const submitProfile = async () => {
    const form = createForm(editProfile);
    try {
      const res = await updateProfile(form);
      setSession({ ...session, user: res.data });
      setUser(res.data);
      setIsOpen(false);
      setEditProfile({});
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTweet = async () => {
    try {
      const res = await putDeleteTweet(deleteTweetId);
      setTweets(res.tweets);
      setPaginate(res.pagination);
      setDeleteTweetId(null);
      setIsTweetDeleteOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteComment = async () => {
    try {
      await sendDeleteComment(deleteCommentId);
      setDeleteCommentId(null);
      setIsCommentDeleteOpen(false);
      init();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPost = (e) => {
    setIsComment(e.target.getAttribute("name") === "comment");
    setIsLoading(true);
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <ReactModal isOpen={isOpen} style={customStyles}>
            <ProfileModal
              editProfile={editProfile}
              closeModal={closeModal}
              changeImage={changeImage}
              changeEditProfile={changeEditProfile}
              birthdateForm={birthdateForm}
              submitProfile={submitProfile}
            />
          </ReactModal>

          <ReactModal isOpen={isTweetDeleteOpen} style={customStyles}>
            <DeleteTweetModal
              closeTweetDeleteModal={closeTweetDeleteModal}
              deleteTweet={deleteTweet}
            />
          </ReactModal>

          <ReactModal isOpen={isCommentDeleteOpen} style={customStyles}>
            <DeleteCommentModal
              closeCommentDeleteModal={closeCommentDeleteModal}
              deleteComment={deleteComment}
            />
          </ReactModal>

          <ProfileHeader user={user} goBack={goBack} />

          <div>
            <ProfileItems
              user={user}
              session={session}
              birthdateFormat={birthdateFormat}
              dateUsed={dateUsed}
              openModal={openModal}
            />
          </div>

          <SelectTweetType isComment={isComment} fetchPost={fetchPost} />

          {isComment ? (
            <MyCommentList
              user={user}
              comments={comments}
              session={session}
              tweetDateFormat={tweetDateFormat}
              openCommentDeleteModal={openCommentDeleteModal}
            />
          ) : (
            <MyTweetList
              user={user}
              tweets={tweets}
              session={session}
              tweetDateFormat={tweetDateFormat}
              openTweetDeleteModal={openTweetDeleteModal}
            />
          )}

          <Pagination paginate={paginate} pageChange={pageChange} />
        </div>
      )}
    </>
  );
};
