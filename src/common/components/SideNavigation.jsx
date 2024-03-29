import { useRecoilValue } from "recoil";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";

import { userState } from "../store/userState";
import { useDeleteAccount } from "../../components/features/deleteAccount/hooks/useDeleteAccount";
import { AccountDeletionModal } from "../../components/features/deleteAccount/components/AccountDeletionModal";

export const SideNavigation = () => {
  const { user } = useRecoilValue(userState);
  const { isOpenAccountModal, setIsOpenAccountModal, hundleAccountDeletion } =
    useDeleteAccount();

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
      width: "300px",
      height: "300px",
    },
  };

  return (
    <div className="h-screen sticky top-0 py-4 px-12 border-r-2">
      <ReactModal isOpen={isOpenAccountModal} style={customStyles}>
        <AccountDeletionModal
          setIsOpenAccountModal={setIsOpenAccountModal}
          hundleAccountDeletion={hundleAccountDeletion}
        />
      </ReactModal>

      <div className="mb-4">
        <svg viewBox="0 0 28 28" aria-hidden="true" className="h-20">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </g>
        </svg>
      </div>
      <div className="flex flex-col h-4/5">
        <Link to={`/home`} className="mb-4">
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10">
                <g>
                  <path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path>
                </g>
              </svg>
            </div>
            <div className="text-lg ml-6">ホーム</div>
          </div>
        </Link>
        <Link to={`/notifications`} className="mb-4">
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10">
                <g>
                  <path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path>
                </g>
              </svg>
            </div>
            <div className="text-lg  ml-6">通知</div>
          </div>
        </Link>
        <Link to={`groups`} className="mb-4">
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10">
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
            </div>
            <div className="text-lg  ml-6">メッセージ</div>
          </div>
        </Link>
        <Link to={`bookmarks`} className="mb-4">
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10">
                <g>
                  <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                </g>
              </svg>
            </div>
            <div className="text-lg  ml-6">ブックマーク</div>
          </div>
        </Link>
        <Link to={`/users/${user.id}`} className="mb-4">
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-10">
                <g>
                  <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM8 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4z"></path>
                </g>
              </svg>
            </div>
            <div className="text-lg  ml-6">プロフィール</div>
          </div>
        </Link>
        <button className="mb-4" onClick={() => setIsOpenAccountModal(true)}>
          <div className="flex items-center">
            <div>
              <svg viewBox="0 0 520 520" aria-hidden="true" className="h-10">
                <g xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="st0"
                    d="M411.384,417.421v-0.22l-5.818,5.818c-10.394,10.394-23.503,17.378-38.011,20.17   c-4.575,0.932-9.31,1.398-13.962,1.398c-2.997,0-5.989-0.235-8.914-0.598c-0.057-0.011-0.11-0.011-0.162-0.023l-0.004,0.012   c-0.049-0.008-0.102-0.004-0.151-0.012v1.008H91.384V67.026h252.978v42.508l-0.023,5.59c0.008,0,0.015,0,0.023-0.003v0.155   c3.022-0.386,6.125-0.622,9.231-0.622c19.625,0,38.086,7.606,51.973,21.493l3.356,3.352l2.307,2.466v-0.158l0.155,0.158V0H24.362   v510.284l-0.004,1.561h0.004V512h387.022v-55.553l0.11-39.133L411.384,417.421z"
                    style={{ fill: "rgb(38, 25, 25)" }}
                  />
                  <path
                    className="st0"
                    d="M475.308,249.792l-91.693-91.694c-7.993-7.989-18.697-12.413-30.022-12.413c-3.106,0-6.209,0.31-9.231,1.087   c-7.838,1.629-15.05,5.587-20.792,11.326c-3.102,3.026-5.662,6.519-7.602,10.318c-1.318,2.405-2.33,4.966-3.102,7.678   c-1.166,3.879-1.784,7.993-1.784,12.106c0,4.03,0.618,8.144,1.784,12.098c1.94,6.75,5.663,12.954,10.705,17.921l11.076,11.075   l7.621,7.777H217.369c-23.507,0-42.511,19.083-42.511,42.511c0,23.428,19.004,42.511,42.511,42.511h73.307l51.636,0.11   l-18.742,18.738c-3.102,3.03-5.662,6.519-7.602,10.318c-1.318,2.409-2.33,4.966-3.102,7.682c-1.166,3.878-1.784,7.993-1.784,12.098   c0,4.038,0.618,8.148,1.784,12.106c1.94,6.75,5.663,12.954,10.705,17.916c4.034,4.038,8.766,7.216,14.042,9.311   c2.17,0.932,4.5,1.629,6.75,2.094c0.386,0.155,0.697,0.231,1.083,0.31c2.716,0.466,5.432,0.777,8.148,0.777   c2.712,0,5.428-0.31,8.068-0.777c8.378-1.629,15.977-5.662,21.954-11.716l27.769-27.772l63.924-63.842   c7.989-7.992,12.334-18.621,12.334-29.867S483.297,257.708,475.308,249.792z"
                    style={{ fill: "rgb(38, 25, 25)" }}
                  />
                </g>
              </svg>
            </div>
            <div className="text-lg  ml-6">退会</div>
          </div>
        </button>
      </div>

      <div className="flex items-center">
        <div>
          <img
            className="w-10 h-10 rounded-full"
            src={user.profile_image_url}
          />
        </div>
        <div className="font-bold text-lg ml-4">{user.name}</div>
      </div>
    </div>
  );
};
