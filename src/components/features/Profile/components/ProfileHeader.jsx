export const ProfileHeader = (props) => {
  const { user, goBack } = props;

  return (
    <div className="flex py-2 items-center sticky top-0 bg-white">
      <div className="mx-4" onClick={goBack}>
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{ color: "rgb(15, 20, 25)" }}
          className="h-5 w-5"
        >
          <g>
            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
          </g>
        </svg>
      </div>
      <div>
        <h2 className="ml-2 font-bold text-xl">{user.name}</h2>
      </div>
    </div>
  );
};
