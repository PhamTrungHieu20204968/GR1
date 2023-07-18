import classNames from "classnames/bind";
import { Button, Avatar, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

import styles from "./Header.module.scss";
import UserMenu from "./UserMenu/UserMenu";

const cx = classNames.bind(styles);

function Header({ showModal }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpenMenu(newOpen);
  };
  return (
    <div className={cx("header")}>
      <div className={cx("header-content")}>
        <Button
          className={cx("create-btn")}
          type="primary"
          size="large"
          onClick={showModal}
        >
          Tạo công việc
        </Button>
        <Popover
          content={<UserMenu setOpenMenu={setOpenMenu}></UserMenu>}
          trigger="click"
          title="User name"
          open={openMenu}
          onOpenChange={handleOpenChange}
        >
          <Avatar
            icon={<UserOutlined />}
            size="large"
            style={{ cursor: "pointer" }}
          />
        </Popover>
      </div>
    </div>
  );
}

export default Header;
