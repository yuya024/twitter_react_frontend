import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useGroupIndex } from "../features/group/hooks/useGroupIndex";
import { Loading } from "../../common/components/Loading";

export const Group = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isShowMessage, setIsShowMessage] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { groupDateFormat, getGroup } = useGroupIndex();

  useEffect(() => {
    init();
    setIsShowMessage(location.pathname === "/groups");
  }, []);

  const init = async () => {
    try {
      const res = await getGroup();
      setGroups(res.groups);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const linkToMessage = (group_id, partner) => {
    navigate(`/groups/${group_id}/messages`, {
      state: { partner_name: partner.name },
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid grid-cols-5">
          <div className="col-span-2 h-screen w-full flex overflow-y-auto border-r">
            <div>
              <div className="font-bold text-lg px-4 py-3">メッセージ</div>
              <div>
                {groups &&
                  groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => linkToMessage(group.group_id, group.user)}
                    >
                      <div className="p-4 flex items-center hover:bg-gray-100">
                        <div className="mr-2">
                          <img
                            src={group.user.profile_image_url}
                            className="w-10 h-10 rounded-full"
                          ></img>
                        </div>
                        <p className="font-bold mr-2">{group.user.name}</p>
                        <p className="text-gray-400">
                          {groupDateFormat(group.created_at)}
                        </p>
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-start-3 col-span-3 h-screen mr-8 border-r">
            {isShowMessage && (
              <div className="flex h-screen items-center justify-center">
                <p className="font-bold text-3xl">メッセージを選択</p>
              </div>
            )}
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};
