import { SideNavigation } from "../../common/components/SideNavigation";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="grid grid-cols-3">
      <SideNavigation />
      <div className="col-span-2">
        <Outlet />
      </div>
    </div>
  );
};
