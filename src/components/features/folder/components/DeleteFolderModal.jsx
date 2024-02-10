export const DeleteFolderModal = (props) => {
  const { deleteFolder, submitFolder, closeDeleteFolderModal } = props;

  return (
    <div className="p-6">
      <p className="font-bold text-xl">{`${deleteFolder.name}フォルダを削除しますか？`}</p>
      <div className="mt-6">
        <button
          name="deleteFolder"
          onClick={submitFolder}
          className="w-full text-white bg-red-500 font-bold text-base rounded-full px-6 py-3"
        >
          削除
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={closeDeleteFolderModal}
          className="w-full text-black bg-white font-bold text-base border rounded-full px-6 py-3"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
