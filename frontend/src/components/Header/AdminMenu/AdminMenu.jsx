import classNames from "classnames/bind";
import { Menu } from "antd";
import { FormOutlined, LogoutOutlined } from "@ant-design/icons";
import { useState } from "react";

import styles from "./Admin.module.scss";
import EditInfoUser from "../../EditInfoUser/EditInfoUser";

const cx = classNames.bind(styles);

function AdminMenu({ setOpenMenu, messageApi }) {
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
    if (e.key === "edit") {
      //   setIsModalOpen(true);
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
        ></EditInfoUser>
      )}
    </div>
  );
}

export default AdminMenu;
