import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Input, Modal } from "antd";

import { useStateContext } from "../../contexts/ContextProvider";
import Header from "../../components/Header/Header";
import ListWorks from "../../components/ListWorks/ListWorks";
import styles from "./Home.module.scss";
import "./HomeLibrary.scss";
import CreateWorkForm from "../../components/CreateWorkForm/CreateWorkForm";

const cx = classNames.bind(styles);
const { Search } = Input;

function Home() {
  const { user, token } = useStateContext();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const onSearch = (value) => console.log(value);

  const showModal = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    if (!token) {
      return navigate("/Login");
    }
  });
  return (
    <div className={cx("home")}>
      <Header showModal={showModal}></Header>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <div className={cx("header-left")}>
            <span className={cx("header-title", "active")}>
              Công việc của tôi
            </span>
            <span className={cx("header-title")}>Công việc chia sẻ</span>
          </div>
          <div className={cx("header-right")}>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              allowClear
              enterButton
            />
          </div>
        </div>
        <div className={cx("body")}>
          <ListWorks showModal={showModal}></ListWorks>
        </div>
      </div>
      <CreateWorkForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        userId={user.id}
      ></CreateWorkForm>
    </div>
  );
}

export default Home;
