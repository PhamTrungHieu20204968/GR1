import classNames from "classnames/bind";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import styles from "./UserMenu.module.scss";

const cx = classNames.bind(styles);
function UserMenu({ setOpenMenu }) {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Thông tin người dùng", "sub1", <FormOutlined />),
    // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    //   getItem("Option 5", "5"),
    //   getItem("Option 6", "6"),
    //   getItem("Submenu", "sub3", null, [
    //     getItem("Option 7", "7"),
    //     getItem("Option 8", "8"),
    //   ]),
    // ]),
    {
      type: "divider",
    },
    getItem("Đăng xuất", "logout", <LogoutOutlined />),
  ];

  const onClick = (e) => {
    console.log("click ", e);
    setOpenMenu(false);
  };
  return (
    <div className={cx("user-menu")}>
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        selectedKeys={[]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
    </div>
  );
}

export default UserMenu;
