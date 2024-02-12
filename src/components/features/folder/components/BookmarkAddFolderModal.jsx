import { Loading } from "../../../../common/components/Loading";

export const BookmarkAddFolderModal = (props) => {
  const {
    isFetchBookmarkLoading,
    unaddedBookmarks,
    selectFolder,
    selectBookmark,
    setSelectBookmark,
    submitAddBookmark,
    closeFolderModal,
    tweetDateFormat,
  } = props;

  return (
    <div className="flex flex-col" style={{ height: "85vh" }}>
      <header className="mx-4 pb-2 border-b-2">
        <div className="flex justify-between items-center">
          <p className="font-bold text-xl">{selectFolder.name}</p>
          <div className="my-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-5 h-5 ml-4"
              style={{ color: "rgb(15, 20, 25)" }}
              onClick={closeFolderModal}
            >
              <g>
                <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
              </g>
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-x-4 items-center mb-1">
          <p className="col-span-4 text-center w-full">
            追加したいブックマークをクリックしてください
          </p>
          <button
            className={`${
              Object.keys(selectBookmark).length === 0
                ? "bg-blue-200"
                : "bg-blue-500"
            } px-2 py-1 w-2/3 text-white text-sm font-bold rounded-full`}
            disabled={Object.keys(selectBookmark).length === 0}
            onClick={submitAddBookmark}
          >
            Add
          </button>
        </div>
      </header>

      {isFetchBookmarkLoading ? (
        <Loading />
      ) : (
        <div className="flex-1 overflow-y-scroll px-4 mb-4">
          {unaddedBookmarks ? (
            unaddedBookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className={`${
                  selectBookmark.id === bookmark.id && "bg-gray-300"
                } grid grid-cols-8 border-b py-2`}
                onClick={() => setSelectBookmark(bookmark)}
              >
                <div className="col-span-1 mx-auto pt-2">
                  <img
                    src={bookmark.tweet.user.profile_image_url}
                    className="rounded-full w-10 h-10"
                  ></img>
                </div>

                <div className="col-span-7">
                  <div className="flex">
                    <p className="mr-4 font-bold">{bookmark.tweet.user.name}</p>
                    <p className="text-gray-600">
                      {tweetDateFormat(bookmark.tweet.created_at)}
                    </p>
                  </div>
                  <div className="px-2 w-3/4">
                    {bookmark.tweet.content
                      .split("\n")
                      .map((text, i) =>
                        text !== "" ? <div key={i}>{text}</div> : <br key={i} />
                      )}
                  </div>
                  <div className="p-2">
                    {bookmark.tweet.image_url && (
                      <img
                        src={bookmark.tweet.image_url}
                        className="h-72 w-3/4 rounded"
                      ></img>
                    )}
                  </div>
                  <div className="grid grid-cols-4">
                    <div className="col-span-1 flex">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <g>
                          <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path>
                        </g>
                      </svg>
                      {bookmark.tweet.comment_count !== 0 && (
                        <p className="px-1 text-sm">
                          {bookmark.tweet.comment_count}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1 flex">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill={bookmark.tweet.retweeted_by ? "green" : undefined}
                      >
                        <g>
                          <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
                        </g>
                      </svg>
                      {bookmark.tweet.retweet_count !== 0 && (
                        <p className="px-1 text-sm">
                          {bookmark.tweet.retweet_count}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1 flex">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill={bookmark.tweet.favorited_by ? "red" : undefined}
                      >
                        <g>
                          <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                        </g>
                      </svg>
                      {bookmark.tweet.favorite_count !== 0 && (
                        <p className="px-1 text-sm">
                          {bookmark.tweet.favorite_count}
                        </p>
                      )}
                    </div>
                    <div className="col-span-1">
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-5 w-5"
                        fill="blue"
                      >
                        <g>
                          <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-52 font-bold">
              ブックマークがありません
            </div>
          )}
        </div>
      )}
    </div>
  );
};
