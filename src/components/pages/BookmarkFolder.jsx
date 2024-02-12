import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Loading } from "../../common/components/Loading";
import { useBookmarkFolderIndex } from "../features/bookmarkFolder/hooks/useBookmarkFolderIndex";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { BookmarkListInFolder } from "../features/bookmarkFolder/components/BookmarkListInFolder";

export const BookmarkFolder = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarksInFolder, setBookmarksInFolder] = useState([]);
  const { getBookmarkFolder } = useBookmarkFolderIndex();
  const { tweetDateFormat } = useTweetDisplay();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const res = await getBookmarkFolder({ folderId: id });
      setBookmarksInFolder(res.added_bookmarks_to_folder);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex items-center border-b">
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
            <p className="font-bold text-lg p-2">ブックマーク &gt; </p>
            <p className="font-bold text-lg py-2">
              {location.state.folderName}
            </p>
          </div>

          <BookmarkListInFolder
            bookmarksInFolder={bookmarksInFolder}
            tweetDateFormat={tweetDateFormat}
          />
        </div>
      )}
    </>
  );
};
