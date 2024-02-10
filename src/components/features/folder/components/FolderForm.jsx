export const FolderForm = (props) => {
  const { inputFolderText, setInputFolderText, submitFolder } = props;

  return (
    <div className="grid grid-cols-10 gap-x-4 py-2 px-4">
      <div className="col-start-1 col-end-9">
        <input
          type="text"
          placeholder="フォルダを新規作成"
          value={inputFolderText}
          className="border rounded px-4 py-1 w-full"
          onChange={(e) => setInputFolderText(e.target.value)}
        />
      </div>
      <button
        className={`${
          inputFolderText === "" ? "bg-blue-200" : "bg-blue-500"
        } col-span-2 px-4 py-1 text-white font-bold rounded-full`}
        disabled={inputFolderText === ""}
        name="createFolder"
        onClick={submitFolder}
      >
        create
      </button>
    </div>
  );
};
