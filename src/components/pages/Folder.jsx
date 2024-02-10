import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import ReactModal from "react-modal";
import toast, { Toaster } from "react-hot-toast";

import { isFolderState } from "../../common/store/isFolderState";
import { useFolderIndex } from "../features/folder/hooks/useFolderIndex";
import { Loading } from "../../common/components/Loading";
import { usePostingFolder } from "../features/folder/hooks/usePostingFolder";
import { useBookmarkFolderIndex } from "../features/bookmarkFolder/hooks/useBookmarkFolderIndex";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { usePostingBookmarkFolder } from "../features/bookmarkFolder/hooks/usePostingBookmarkFolder";
import { BookmarkAddFolderModal } from "../features/folder/components/BookmarkAddFolderModal";
import { FolderForm } from "../features/folder/components/FolderForm";
import { FolderList } from "../features/folder/components/FolderList";
import { useDeleteFolder } from "../features/folder/hooks/useDeleteFolder";
import { DeleteFolderModal } from "../features/folder/components/DeleteFolderModal";

export const Folder = () => {
  const setIsFolder = useSetRecoilState(isFolderState);
  const [inputFolderText, setInputFolderText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchBookmarkLoading, setIsFetchBookmarkLoading] = useState(true);
  const [folders, setFolders] = useState([]);
  const [selectFolder, setSelectFolder] = useState({});
  const [deleteFolder, setDeleteFolder] = useState({});
  const [selectBookmark, setSelectBookmark] = useState({});
  const [unaddedBookmarks, setUnaddedBookmarks] = useState([]);
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const [isOpenDeleteFolderModal, setIsOpenDeleteFolderModal] = useState(false);
  const { folderDateFormat, getFolder } = useFolderIndex();
  const { postFolder } = usePostingFolder();
  const { deletingFolder } = useDeleteFolder();
  const { getBookmarkFolder } = useBookmarkFolderIndex();
  const { tweetDateFormat } = useTweetDisplay();
  const { postBookmarkAddFolder } = usePostingBookmarkFolder();

  useEffect(() => {
    setIsFolder(true);
    init();
  }, []);

  const init = async () => {
    try {
      const res = await getFolder();
      setFolders(res.folders);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
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
      width: `${isOpenDeleteFolderModal ? "300px" : "600px"}`,
      maxWidth: "600px",
      minHeight: `${isOpenDeleteFolderModal ? "250px" : "300px"}`,
      maxHeight: "800px",
      overflow: "visible",
    },
  };

  const closeFolderModal = () => {
    setSelectFolder({});
    setSelectBookmark({});
    setIsOpenFolder(false);
  };

  const openDeleteFolderModal = (e, folder) => {
    e.preventDefault();
    setIsOpenDeleteFolderModal(true);
    setDeleteFolder(folder);
  };

  const closeDeleteFolderModal = () => {
    setIsOpenDeleteFolderModal(false);
    setDeleteFolder({});
  };

  const submitFolder = async (e) => {
    try {
      if (e.target.name === "createFolder") {
        await postFolder(inputFolderText);
        setInputFolderText("");
      } else {
        await deletingFolder(deleteFolder.id);
        closeDeleteFolderModal();
      }
      init();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchBookmark = async (e, folder) => {
    e && e.preventDefault();
    setSelectFolder(folder);
    setIsOpenFolder(true);
    try {
      const res = await getBookmarkFolder({ folderId: folder.id, isAdd: true });
      setUnaddedBookmarks(res.not_added_bookmarks_to_folder);
      setIsFetchBookmarkLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const submitAddBookmark = async () => {
    const params = {
      folderId: selectFolder.id,
      bookmarkId: selectBookmark.id,
    };
    try {
      await postBookmarkAddFolder(params);
      setSelectBookmark({});
      toast.success(`${selectFolder.name}にブックマークを追加しました`);
      fetchBookmark(null, selectFolder);
    } catch (e) {
      toast.error("ブックマークの追加に失敗しました");
      console.log(e);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div>
            <Toaster />
          </div>

          <ReactModal isOpen={isOpenFolder} style={customStyles}>
            <BookmarkAddFolderModal
              isFetchBookmarkLoading={isFetchBookmarkLoading}
              unaddedBookmarks={unaddedBookmarks}
              selectFolder={selectFolder}
              selectBookmark={selectBookmark}
              setSelectBookmark={setSelectBookmark}
              submitAddBookmark={submitAddBookmark}
              closeFolderModal={closeFolderModal}
              tweetDateFormat={tweetDateFormat}
            />
          </ReactModal>

          <ReactModal isOpen={isOpenDeleteFolderModal} style={customStyles}>
            <DeleteFolderModal
              deleteFolder={deleteFolder}
              submitFolder={submitFolder}
              closeDeleteFolderModal={closeDeleteFolderModal}
            />
          </ReactModal>

          <FolderForm
            inputFolderText={inputFolderText}
            setInputFolderText={setInputFolderText}
            submitFolder={submitFolder}
          />

          <FolderList
            folders={folders}
            folderDateFormat={folderDateFormat}
            fetchBookmark={fetchBookmark}
            openDeleteFolderModal={openDeleteFolderModal}
          />
        </div>
      )}
    </>
  );
};
