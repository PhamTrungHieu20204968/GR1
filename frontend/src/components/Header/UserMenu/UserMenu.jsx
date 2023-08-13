import classNames from "classnames/bind";
import { Menu } from "antd";
import { FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./UserMenu.module.scss";
import EditInfoUser from "../../EditInfoUser/EditInfoUser";

const cx = classNames.bind(styles);

function UserMenu({ setOpenMenu, messageApi, user, setUser }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    getItem("Thông tin người dùng", "edit", <FormOutlined />),
    {
      type: "divider",
    },
    getItem("Đăng xuất", "logout", <LogoutOutlined />),
  ];

  const onSelect = (e) => {
    switch (e.key) {
      case "edit":
        setIsModalOpen(true);
        break;
      case "logout":
        navigate("/Login");
        localStorage.removeItem("ACCESS_TOKEN");
        setUser({});
        break;
      default:
        break;
    }
    setOpenMenu(false);
  };
  return (
    <div className={cx("user-menu")}>
      <Menu
        onSelect={onSelect}
        style={{
          width: 256,
        }}
        selectedKeys={[]}
        mode="inline"
        items={items}
      />

      {isModalOpen && (
        <EditInfoUser
          openModal={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onEdit
          messageApi={messageApi}
          user={user}
        ></EditInfoUser>
      )}
    </div>
  );
}

export default UserMenu;
