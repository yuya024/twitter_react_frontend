export const SignupForm = (props) => {
  const { type, value, changeSignupObj, children } = props;

  return (
    <div>
      <label
        htmlFor={type}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {children}
      </label>
      <div className="mt-1">
        <input
          id={type}
          name={type}
          type={type === "passwordConfirmation" ? "password" : type}
          autoComplete={type}
          required
          value={value}
          onChange={(e) => changeSignupObj(e)}
          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
