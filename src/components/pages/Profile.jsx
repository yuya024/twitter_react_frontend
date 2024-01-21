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

export const Profile = () => {
  const { id } = useParams();
  const [session, setSession] = useRecoilState(userState);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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
      height: "650px",
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
          />

          <Pagination paginate={paginate} pageChange={pageChange} />
        </div>
      )}
    </>
  );
};
