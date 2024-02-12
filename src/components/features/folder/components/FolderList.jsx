import { Link } from "react-router-dom";

export const FolderList = (props) => {
  const { folders, folderDateFormat, fetchBookmark, openDeleteFolderModal } =
    props;

  return (
    <>
      {folders && (
        <div className="grid grid-cols-2 gap-8 p-4">
          {folders.map((folder) => (
            <Link
              to={`/folders/${folder.id}/bookmark_folders`}
              state={{ folderName: folder.name }}
              key={folder.id}
            >
              <div className="transition hover:scale-105 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {folder.name}
                  </h5>
                  <p>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-5 h-5 flex-none mr-3"
                      onClick={(e) => openDeleteFolderModal(e, folder)}
                    >
                      <g>
                        <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
                      </g>
                    </svg>
                  </p>
                </div>
                <p className="mb-3 font-normal text-gray-700">
                  {folderDateFormat(folder.created_at)}
                </p>
                <button
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  onClick={(e) => fetchBookmark(e, folder)}
                >
                  Add Bookmark
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
