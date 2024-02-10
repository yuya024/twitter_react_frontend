import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import toast, { Toaster } from "react-hot-toast";

import { useBookmarkIndex } from "../features/bookmark/hooks/useBookmarkIndex";
import { Loading } from "../../common/components/Loading";
import { useTweetDisplay } from "../features/displayTweet/hooks/useTweetDisplay";
import { useDeleteBookmark } from "../features/bookmark/hooks/useDeleteBookmark";
import { Pagination } from "../../common/components/Pagination";
import { BookmarkList } from "../features/bookmark/components/BookmarkList";
import { isFolderState } from "../../common/store/isFolderState";

export const Bookmark = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const [paginate, setPaginate] = useState({});
  const { getBookmark } = useBookmarkIndex();
  const { tweetDateFormat } = useTweetDisplay();
  const { deleteBookmark } = useDeleteBookmark();
  const setIsFolder = useSetRecoilState(isFolderState);

  useEffect(() => {
    init();
  }, []);

  const init = async (page) => {
    setIsLoading(true);
    try {
      const res = await getBookmark(page);
      setBookmarks(res.bookmarks);
      setPaginate(res.pagination);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    setIsFolder(false);
  };

  const pageChange = (targetPage) => {
    init(targetPage);
  };

  const submitBookmark = async (bookmarkId) => {
    try {
      await toast.promise(deleteBookmark(bookmarkId), {
        success: "ブックマークを削除しました",
      });
      init();
    } catch (e) {
      console.log(e);
      toast.error("ブックマークの削除に失敗しました");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div>
            <Toaster />
          </div>

          {bookmarks ? (
            <>
              <BookmarkList
                bookmarks={bookmarks}
                tweetDateFormat={tweetDateFormat}
                submitBookmark={submitBookmark}
              />
              <Pagination paginate={paginate} pageChange={pageChange} />
            </>
          ) : (
            <div
              className="flex justify-center items-center"
              style={{ height: "80vh" }}
            >
              <p>ブックマークはありません</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
