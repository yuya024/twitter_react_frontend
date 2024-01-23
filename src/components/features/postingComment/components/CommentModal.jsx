export const CommentModal = (props) => {
  const {
    replyToTweet,
    session,
    commentValue,
    closeCommentModal,
    tweetDateFormat,
    changeComment,
    submitComment,
  } = props;

  return (
    <div>
      <div className="my-5">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-5 h-5 ml-4"
          style={{ color: "rgb(15, 20, 25)" }}
          onClick={closeCommentModal}
        >
          <g>
            <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
          </g>
        </svg>
      </div>

      {replyToTweet && (
        <div
          className="grid grid-cols-8 py-2 px-4"
          style={{ minHeight: "100px" }}
        >
          <div className="col-span-1 mx-auto pt-2 relative">
            <img
              src={replyToTweet.user.profile_image_url}
              className="rounded-full w-10 h-10"
            ></img>
            <div className="absolute border-l-4 h-3/5 left-4 mt-1"></div>
          </div>

          <div className="col-span-7">
            <div className="flex">
              <p className="mr-4 font-bold">{replyToTweet.user.name}</p>
              <p className="text-gray-600">
                {tweetDateFormat(replyToTweet.created_at)}
              </p>
            </div>
            <div>
              {replyToTweet.content
                .split("\n")
                .map((text, i) =>
                  text !== "" ? <div key={i}>{text}</div> : <br key={i} />
                )}
            </div>
            <div>
              {replyToTweet.image_url && (
                <p className="break-words">{replyToTweet.image_url}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-8 py-2 px-4">
        <div className="col-span-1 mx-auto pt-2">
          <img
            src={session.user.profile_image_url}
            className="rounded-full w-10 h-10"
          ></img>
        </div>
        <form className="col-span-7">
          <textarea
            rows="3"
            placeholder="返信をポスト"
            className="p-2 text-xl rounded block w-full outline-none resize-none text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-inset sm:leading-6"
            value={commentValue}
            onChange={changeComment}
          ></textarea>

          <div className="pt-2 px-2 flex justify-end items-center text-sm leading-6 text-gray-600">
            <button
              type="submit"
              className={`${
                !commentValue
                  ? "bg-indigo-200 hover:bg-indigo-100"
                  : "bg-indigo-600 hover:bg-indigo-500"
              } right-0 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              onClick={submitComment}
              disabled={!commentValue}
            >
              返信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
