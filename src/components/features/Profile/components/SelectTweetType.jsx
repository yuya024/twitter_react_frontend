export const SelectTweetType = (props) => {
  const { isComment, fetchPost } = props;

  return (
    <div className="flex pb-2 border-b justify-around">
      <div className="px-4">
        <button
          className={`${!isComment && "font-bold border-b-2 border-blue-400"}`}
          name="post"
          onClick={fetchPost}
          disabled={!isComment}
        >
          ポスト
        </button>
      </div>
      <div className="px-4">
        <button
          className={`${isComment && "font-bold border-b-2 border-blue-400"}`}
          name="comment"
          onClick={fetchPost}
          disabled={isComment}
        >
          コメント一覧
        </button>
      </div>
    </div>
  );
};
