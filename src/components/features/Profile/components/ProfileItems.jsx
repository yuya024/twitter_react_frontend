export const ProfileItems = (props) => {
  const {
    user,
    session,
    follow,
    submitFollow,
    submitUnfollow,
    createGroup,
    birthdateFormat,
    dateUsed,
    openModal,
  } = props;

  return (
    <>
      <div>
        <img src={user.header_image_url} className="h-52 w-full"></img>
      </div>
      <div className="px-4 py-3">
        <div className="flex justify-between">
          <div>
            <img
              src={user.profile_image_url}
              className="-mt-20 w-36 h-36 rounded-full p-1"
            ></img>
          </div>
          <div className="flex items-center">
            <button
              className="mr-4 border rounded-full p-2"
              onClick={createGroup}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5"
                style={{ color: "rgb(15, 20, 25)" }}
              >
                <g>
                  <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                </g>
              </svg>
            </button>
            <div>
              {user.id === session.user.id ? (
                <button
                  onClick={openModal}
                  className="cursor-pointer font-bold py-2 px-4 rounded-full border"
                >
                  プロフィールを編集
                </button>
              ) : follow.is_followed ? (
                <button
                  onClick={submitUnfollow}
                  className="cursor-pointer font-bold py-2 px-4 rounded-full border"
                >
                  フォロー中
                </button>
              ) : (
                <button
                  onClick={submitFollow}
                  className="cursor-pointer font-bold text-white bg-black py-2 px-4 rounded-full border"
                >
                  フォロー
                </button>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-xl mb-2">{user.name}</div>
          {user.introduction && (
            <div className="mb-1">
              {user.introduction
                .split("\n")
                .map((text, i) =>
                  text === "" ? <br key={i} /> : <div key={i}>{text}</div>
                )}
            </div>
          )}
          <div className="mb-4">
            {user.location && (
              <div className="flex items-center">
                <svg
                  viewBox="0 0 22 22"
                  aria-hidden="true"
                  className="w-4 h-4 mr-1"
                >
                  <g>
                    <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
                  </g>
                </svg>
                <span className="text-gray-600 text-sm">{user.location}</span>
              </div>
            )}
            <div className="flex">
              {user.website && (
                <div className="flex items-center mr-3">
                  <svg
                    viewBox="0 0 22 22"
                    aria-hidden="true"
                    className="w-4 h-4 mr-1"
                  >
                    <g>
                      <path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"></path>
                    </g>
                  </svg>
                  <span className="text-gray-600 text-sm">
                    <a
                      href={`https://${user.website}`}
                      className=" text-blue-500"
                    >
                      {user.website}
                    </a>
                  </span>
                </div>
              )}
              {user.birthdate && (
                <div className="flex items-center">
                  <svg
                    viewBox="0 0 22 22"
                    aria-hidden="true"
                    className="w-4 h-4 mr-1"
                  >
                    <g>
                      <path d="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z"></path>
                    </g>
                  </svg>
                  <span className="text-gray-600 text-sm">
                    {birthdateFormat(user.birthdate)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <svg
                viewBox="0 0 22 22"
                aria-hidden="true"
                className="mr-2 w-4 h-4"
              >
                <g>
                  <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                </g>
              </svg>
              <span className="text-gray-600 text-sm">
                {dateUsed(user.created_at)}
              </span>
            </div>
          </div>
          <div className="flex">
            <p className="mr-5 text-sm text-gray-600">
              {`${follow.following_count}フォロー中`}
            </p>
            <p className="text-sm text-gray-600">{`${follow.followers_count}フォロワー`}</p>
          </div>
        </div>
      </div>
    </>
  );
};
