import { Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { isFolderState } from "../../common/store/isFolderState";

export const BookmarkLayout = () => {
  const isFolder = useRecoilValue(isFolderState);
  const navigate = useNavigate();

  const changeLink = (e) => {
    e.currentTarget.name === "folder"
      ? navigate("/folders")
      : navigate("/bookmarks");
  };

  return (
    <div>
      <div>
        <p className="font-bold text-lg p-2">ブックマーク</p>
      </div>
      <div className="flex justify-around border-b py-1">
        <button name="allBookmark" disabled={!isFolder} onClick={changeLink}>
          <p className={!isFolder ? "border-b-2 border-blue-500" : undefined}>
            すべて
          </p>
        </button>
        <button name="folder" disabled={isFolder} onClick={changeLink}>
          <p className={isFolder ? "border-b-2 border-blue-500" : undefined}>
            フォルダ
          </p>
        </button>
      </div>
      <Outlet />
    </div>
  );
};
