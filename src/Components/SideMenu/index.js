import {
  AppstoreOutlined,
  ShopOutlined,
  AreaChartOutlined,
  FileTextOutlined,
  DashboardOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Dashbaord",
            icon: <DashboardOutlined />,
            key: "/",
          },
          {
            label: "Analytics",
            key: "/Analytics",
            icon: <AreaChartOutlined />,
          },
          {
            label: "OverView",
            key: "/OverView",
            icon: <ShopOutlined />,
          },
          {
            label: "Reports",
            key: "/Reports",
            icon: <FileTextOutlined />,
          },
          
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
