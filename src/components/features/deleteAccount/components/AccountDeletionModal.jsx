export const AccountDeletionModal = (props) => {
  const { hundleAccountDeletion, setIsOpenAccountModal } = props;

  return (
    <div className="p-6">
      <p className="font-bold text-xl mb-2">
        アカウントを削除してもよろしいですか？
      </p>
      <p className="text-sm">
        アカウント削除後のキャンセル、アカウントの復元はできません。
      </p>
      <div className="mt-6">
        <button
          name="deleteFolder"
          onClick={hundleAccountDeletion}
          className="w-full text-white bg-red-500 font-bold text-base rounded-full px-6 py-3"
        >
          退会する
        </button>
      </div>
      <div className="mt-3">
        <button
          onClick={() => setIsOpenAccountModal(false)}
          className="w-full text-black bg-white font-bold text-base border rounded-full px-6 py-3"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};
