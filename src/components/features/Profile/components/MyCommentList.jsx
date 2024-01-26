export const MyCommentList = (props) => {
  const { comments, user, session, tweetDateFormat, openCommentDeleteModal } =
    props;

  return (
    <>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="grid grid-cols-8 border-b py-2"
          style={{ minHeight: "100px" }}
        >
          <div className="col-span-1 mx-auto pt-2">
            <img
              src={user.profile_image_url}
              className="rounded-full w-10 h-10"
            ></img>
          </div>
          <div className="col-span-7">
            <div className="flex items-center">
              <p className="mr-4 font-bold flex-none">{user.name}</p>
              <p className="text-gray-600 grow">
                {tweetDateFormat(comment.created_at)}
              </p>
              {user.id === session.user.id && (
                <p>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5 flex-none mr-3"
                    onClick={() => openCommentDeleteModal(comment.id)}
                  >
                    <g>
                      <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                    </g>
                  </svg>
                </p>
              )}
            </div>
            <div className="px-2 w-3/4">
              {comment.content
                .split("\n")
                .map((text, i) =>
                  text !== "" ? <div key={i}>{text}</div> : <br key={i} />
                )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
