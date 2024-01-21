export const DeleteTweetModal = (props) => {
  const { closeTweetDeleteModal, deleteTweet } = props;

  return (
    <div className="p-6">
      <p className="font-bold text-xl">ポストを削除しますか？</p>
      <div className="mt-6">
        <button
          onClick={deleteTweet}
          className="w-full text-white bg-red-500 font-bold text-base rounded-full px-6 py-3"
        >
          削除
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={closeTweetDeleteModal}
          className="w-full text-black bg-white font-bold text-base border rounded-full px-6 py-3"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
