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

export const Profile = () => {
  const { id } = useParams();
  const [session, setSession] = useRecoilState(userState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isTweetDeleteOpen, setIsTweetDeleteOpen] = useState(false);
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
  const { deleteTweetId, setDeleteTweetId, putDeleteTweet } = useDeleteTweet();

  useEffect(() => {
    init();
  }, []);

  const init = async (page) => {
    try {
      const res = await getProfile({ id, page });
      setUser(res.user);
      setTweets(res.tweets);
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

  const openTweetDeleteModal = (tweet_id) => {
    setIsTweetDeleteOpen(true);
    setDeleteTweetId(tweet_id);
  };

  const closeTweetDeleteModal = () => {
    setIsTweetDeleteOpen(false);
    setDeleteTweetId(null);
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

          <div className="flex border-b">
            <div className="px-4">ポスト</div>
          </div>

          <MyTweetList
            user={user}
            tweets={tweets}
            tweetDateFormat={tweetDateFormat}
            openTweetDeleteModal={openTweetDeleteModal}
          />

          <Pagination paginate={paginate} pageChange={pageChange} />
        </div>
      )}
    </>
  );
};
