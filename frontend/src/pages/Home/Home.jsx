import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import { Input, message } from "antd";
import axios from "axios";

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
  const [works, setWorks] = useState([]);

  const [messageApi, contextHolder] = message.useMessage();

  const onSearch = (value) => console.log(value);
  const showModal = () => {
    setOpenModal(true);
  };

  const getWorks = async () => {
    await axios
      .post("http://localhost:8000/api/work/get", {
        userId: user.id || 1,
      })
      .then((res) => {
        setWorks(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getWorks();
  }, [JSON.stringify(works)]);

  // useEffect(() => {
  //   if (!token || !user.id) {
  //     return navigate("/Login");
  //   }
  // });
  return (
    <div className={cx("home")}>
      {contextHolder}
      <Header showModal={showModal} user={user}></Header>
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
          <ListWorks
            works={works}
            showModal={showModal}
            setWorks={setWorks}
            messageApi={messageApi}
          ></ListWorks>
        </div>
      </div>
      <CreateWorkForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        userId={user.id}
        setWorks={setWorks}
        messageApi={messageApi}
      ></CreateWorkForm>
    </div>
  );
}

export default Home;
