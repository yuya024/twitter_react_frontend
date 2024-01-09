export const TweetForm = (props) => {
  const {
    textValue,
    image,
    changeInput,
    changeImage,
    submitDisabled,
    submitForm,
  } = props;

  return (
    <form>
      <div className="mt-12 w-1/2 border rounded m-auto">
        <textarea
          id="about"
          name="about"
          rows="3"
          placeholder="今なにしてる？"
          className="p-2 block w-full outline-none resize-none text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
          value={textValue}
          onChange={changeInput}
        ></textarea>

        <div className="p-2 flex justify-between items-center text-sm leading-6 text-gray-600">
          <div className="flex">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <svg
                className="mx-auto h-6 w-6 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
              </svg>

              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={changeImage}
              />
            </label>

            {image ? <span className="ml-2">{image.name}</span> : null}
          </div>
          <button
            type="submit"
            className={`${
              submitDisabled
                ? "bg-indigo-200 hover:bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-500"
            } rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
            onClick={submitForm}
            disabled={submitDisabled}
          >
            ツイート
          </button>
        </div>
      </div>
    </form>
  );
};
