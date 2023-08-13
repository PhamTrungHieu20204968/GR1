import classNames from "classnames/bind";
import { Menu } from "antd";
import { FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import styles from "./Admin.module.scss";
import ChangePassForm from "../../ChangePassForm/ChangePassForm";

const cx = classNames.bind(styles);

function AdminMenu({ setOpenMenu, messageApi, setUser, user }) {
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
    getItem("Đổi mật khẩu", "edit", <FormOutlined />),
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
        navigate("/LoginAdmin");
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
        <ChangePassForm
          openModal={isModalOpen}
          messageApi={messageApi}
          userId={user?.id}
          setIsModalOpen={setIsModalOpen}
          admin
        ></ChangePassForm>
      )}
    </div>
  );
}

export default AdminMenu;
