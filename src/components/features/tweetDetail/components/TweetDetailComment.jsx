export const TweetDetailComment = (props) => {
  const { comments, commentDateFormat } = props;

  return comments.map((comment) => (
    <div
      key={comment.id}
      className="grid grid-cols-8 border-b py-2"
      style={{ minHeight: "100px" }}
    >
      <div className="col-span-1 mx-auto pt-2">
        <img
          src={comment.user.profile_image_url}
          className="rounded-full w-10 h-10"
        ></img>
      </div>
      <div className="col-span-7">
        <div className="flex items-center">
          <p className="mr-4 font-bold flex-none">{comment.user.name}</p>
          <p className="text-gray-600 grow">
            {commentDateFormat(comment.created_at)}
          </p>
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
  ));
};
