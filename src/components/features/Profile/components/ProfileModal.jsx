export const ProfileModal = (props) => {
  const {
    editProfile,
    closeModal,
    changeImage,
    changeEditProfile,
    birthdateForm,
    submitProfile,
  } = props;

  return (
    <>
      <div className="flex items-center px-4 py-2">
        <div className="mr-6 flex-none">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-5 h-5 cursor-pointer"
            style={{ color: "rgb(15, 20, 25)" }}
            onClick={closeModal}
          >
            <g>
              <path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
            </g>
          </svg>
        </div>
        <div className="grow">
          <h2 className="font-bold text-xl">プロフィールを編集</h2>
        </div>
        <div className="flex-none">
          <button
            onClick={submitProfile}
            className={`${
              editProfile.name ? "bg-black" : "bg-gray-400"
            } text-white font-bold text-sm px-4 py-1 rounded-full`}
            disabled={!editProfile.name}
          >
            保存
          </button>
        </div>
      </div>

      <div className="relative">
        <img src={editProfile.header_image_url} className="h-52 w-full "></img>
        <label
          htmlFor="header-image"
          className="absolute top-1/2 left-1/2 cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-5 h-5"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <g>
              <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
            </g>
          </svg>
          <input
            id="header-image"
            name="header_image"
            type="file"
            className="sr-only"
            onChange={changeImage}
          />
        </label>
        {editProfile.header_image && (
          <div className="absolute bottom-1/4 left-1/2 bg-black rounded opacity-70 -translate-x-1/2 ">
            <p className="text-white text-xs p-1">
              {editProfile.header_image.name}
            </p>
          </div>
        )}
      </div>

      <div className="ml-4 mb-4 relative">
        <img
          src={editProfile.profile_image_url}
          className="-mt-14 w-28 h-28 rounded-full p-1"
        ></img>
        <label
          htmlFor="profile-image"
          className="absolute  cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-indigo-500"
          style={{ top: "43%", left: "7.5%" }}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="w-5 h-5"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <g>
              <path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5V10h2v8.5c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zm-4 2c0-2.209 1.791-4 4-4s4 1.791 4 4-1.791 4-4 4-4-1.791-4-4zM17 2c0 1.657-1.343 3-3 3v1c1.657 0 3 1.343 3 3h1c0-1.657 1.343-3 3-3V5c-1.657 0-3-1.343-3-3h-1z"></path>
            </g>
          </svg>
          <input
            id="profile-image"
            name="profile_image"
            type="file"
            className="sr-only"
            onChange={changeImage}
          />
        </label>
        {editProfile.profile_image && (
          <div className="pl-1">
            <p className="text-gray-600 text-xs">
              {editProfile.profile_image.name}
            </p>
          </div>
        )}
      </div>

      <div className="mx-4">
        <div className="relative z-0 mb-4 border rounded px-2 pt-4 pb-2">
          <input
            type="text"
            name="name"
            className="peer block w-full appearance-none bg-transparent text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=""
            value={editProfile.name}
            onChange={changeEditProfile}
          />
          <label
            className={`${
              editProfile.name ? "-translate-y-3.5" : "-translate-y-6"
            } absolute top-3.5 -z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500`}
          >
            名前
          </label>
          {!editProfile.name && (
            <span className="text-sm text-red-500">名前を入力してください</span>
          )}
        </div>
        <div className="relative z-0 mb-4 border rounded px-2 pt-4 pb-2">
          <textarea
            type="text"
            name="introduction"
            className="peer block w-full appearance-none bg-transparent text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={editProfile.introduction}
            onChange={changeEditProfile}
          />
          <label
            className={`${
              editProfile.introduction ? "-translate-y-3.5" : "-translate-y-6"
            } absolute top-3.5 -z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500`}
          >
            自己紹介
          </label>
        </div>
        <div className="relative z-0 mb-4 border rounded px-2 pt-4 pb-2">
          <input
            type="text"
            name="location"
            className="peer block w-full appearance-none bg-transparent text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={editProfile.location}
            onChange={changeEditProfile}
          />
          <label
            className={`${
              editProfile.location ? "-translate-y-3.5" : "-translate-y-6"
            } absolute top-3.5 -z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500`}
          >
            場所
          </label>
        </div>
        <div className="relative z-0 mb-4 border rounded px-2 pt-4 pb-2">
          <input
            type="text"
            name="website"
            className="peer block w-full appearance-none bg-transparent text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=" "
            value={editProfile.website}
            onChange={changeEditProfile}
          />
          <label
            className={`${
              editProfile.website ? "-translate-y-3.5" : "-translate-y-6"
            } absolute top-3.5 -z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-2 peer-focus:-translate-y-3.5 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500`}
          >
            ウェブサイト
          </label>
        </div>
        <div className="mb-4 border rounded px-2 py-2 group">
          <label
            htmlFor="birthdate"
            className="text-sm text-gray-500 group-focus-within:text-blue-600 group-focus-within:text-xs"
          >
            誕生日
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="w-full text-base text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            placeholder=""
            value={birthdateForm(editProfile.birthdate)}
            onChange={changeEditProfile}
          />
        </div>
      </div>
    </>
  );
};
