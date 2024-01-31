import { useEffect, useState } from "react";

import { useNotification } from "../features/notification/hooks/useNotification";
import { Loading } from "../../common/components/Loading";
import { Pagination } from "../../common/components/Pagination";

export const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [paginate, setPaginate] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { getNotification } = useNotification();

  useEffect(() => {
    init();
  }, []);

  const init = async (page) => {
    try {
      const res = await getNotification(page);
      setNotifications(res.notifications);
      setPaginate(res.pagination);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const pageChange = (targetPage) => {
    init(targetPage);
  };

  const subjectIcon = (subject_type) => {
    if (subject_type === "Follow") {
      return "M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z";
    } else if (subject_type === "Favorite") {
      return "M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z";
    } else {
      return "M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z";
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div>
          <div className="font-bold text-xl border-b p-2">通知</div>
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="py-3 px-4 border-b flex items-center"
              >
                <div className="mr-2">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="w-5 h-5"
                  >
                    <g>
                      <path d={subjectIcon(notification.subject_type)}></path>
                    </g>
                  </svg>
                </div>
                <p>{notification.subject.display}</p>
              </div>
            ))}
          </div>
          <Pagination paginate={paginate} pageChange={pageChange} />
        </div>
      )}
    </>
  );
};
