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
  const { user, token, setUser } = useStateContext();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [works, setWorks] = useState();
  const [tab, setTab] = useState("1");
  const [messageApi, contextHolder] = message.useMessage();
  const [myWork, setMyWork] = useState([]);
  const [shareWork, setShareWork] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSearch = (value) => {
    const searchResult = works.filter((work) => {
      return work.name.toUpperCase().includes(value.toUpperCase());
    });
    classifyWorks(searchResult);
  };
  const showModal = () => {
    setOpenModal(true);
  };
  const getWorks = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/work/get", {
        userId: user.id,
      })
      .then((res) => {
        setWorks(res.data);
        classifyWorks(res.data);
      })
      .then(() => {
        getShareWorks();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getShareWorks = async () => {
    await axios
      .post("http://localhost:8000/api/share/getByUserId", {
        userId: user.id,
      })
      .then((res) => {
        setShareWork((prev) => prev.concat(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
    setLoading(false);
  };

  const classifyWorks = (works) => {
    const _mywork = [],
      _shareworks = [];
    works?.forEach((item, index, arr) => {
      if (item.type === "1") {
        _mywork.push(item);
      } else _shareworks.push(item);
    });
    setMyWork(_mywork);
    setShareWork(_shareworks);
  };

  useEffect(() => {
    getWorks();
  }, [JSON.stringify(works)]);

  useEffect(() => {
    if (!token || !user.id) {
      return navigate("/Login");
    }
  });
  return (
    <div className={cx("home")}>
      {contextHolder}
      <Header
        showModal={showModal}
        user={user}
        messageApi={messageApi}
        setUser={setUser}
      ></Header>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <div className={cx("header-left")}>
            <span
              className={cx("header-title", tab === "1" ? "active" : "")}
              onClick={() => setTab("1")}
            >
              Công việc của tôi
            </span>
            <span
              className={cx("header-title", tab === "2" ? "active" : "")}
              onClick={() => setTab("2")}
            >
              Công việc chia sẻ
            </span>
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
          {!loading && (
            <ListWorks
              works={tab === "1" ? myWork : shareWork}
              showModal={showModal}
              setWorks={setWorks}
              messageApi={messageApi}
            ></ListWorks>
          )}
        </div>
      </div>
      <CreateWorkForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        userId={user.id}
        setWorks={setWorks}
        messageApi={messageApi}
        setTab={setTab}
      ></CreateWorkForm>
    </div>
  );
}

export default Home;
