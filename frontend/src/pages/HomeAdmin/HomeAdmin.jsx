import Header from "../../components/Header/Header";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { Badge, Space, Table, Button, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";

import styles from "./HomeAdmin.module.scss";
import { useStateContext } from "../../contexts/ContextProvider";
import EditInfoUser from "../../components/EditInfoUser/EditInfoUser";

const cx = classNames.bind(styles);

function HomeAdmin() {
  const { admin, token, setAdmin } = useStateContext();
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [table, setTable] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [openModal, setOpenModal] = useState(false);

  const handleEdit = (e) => {
    getUserId(e);
    setOpenModal(true);
  };
  const handleDelete = async () => {
    await axios
      .post("http://localhost:8000/api/user/deleteOne", {
        userId: currentId,
      })
      .then((res) => {
        const newList = userList.filter((item) => {
          return item.id !== currentId;
        });
        setUserList(newList);
        messageApi.open({
          type: "success",
          content: "Xóa thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUserId = (e) => {
    let currentNode = e.target.parentNode;
    while (!currentNode.className.includes("ant-table-row-level-0")) {
      currentNode = currentNode.parentNode;
    }
    setCurrentId(parseInt(currentNode.getAttribute("data-row-key")));
  };

  const expandedRowRender = (record) => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        sorter: (a, b) => a.date > b.date,
      },
      {
        title: "Work id",
        dataIndex: "workID",
        key: "workID",
        sorter: (a, b) => a.workID - b.workID,
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        filters: [
          {
            text: "Create",
            value: "Create",
          },
          {
            text: "Update",
            value: "Update",
          },
          {
            text: "Delete",
            value: "Delete",
          },
        ],
        onFilter: (value, record) => record.address.startsWith(value),
        filterSearch: true,
      },

      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },

      {
        title: "Option",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <Button type="primary" danger>
              Undo
            </Button>
          </Space>
        ),
      },
    ];
    const data = [];
    historyList.forEach((item) => {
      if (item.user_id === record.userId) {
        data.push({
          workID: item.work_id,
          action: item.action,
          date: item.created_at,
        });
      }
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 150 }}
      />
    );
  };
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: userList.reduce((res, item) => {
        return [...res, { text: item.name, value: item.name }];
      }, []),
      onFilter: (value, record) => record.name.includes(value),
      filterSearch: true,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filters: userList.reduce((res, item) => {
        return [...res, { text: item.account, value: item.account }];
      }, []),
      onFilter: (value, record) => record.email.includes(value),
      filterSearch: true,
    },

    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Options",
      key: "operation",
      render: () => (
        <Space>
          <Button type="primary" onClick={(e) => handleEdit(e)}>
            Edit
          </Button>
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn có chắc chắn muốn xóa?"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: "red",
                }}
              />
            }
            onConfirm={handleDelete}
            onCancel={(event) => event.stopPropagation()}
            onPopupClick={(event) => event.stopPropagation()}
          >
            <Button type="primary" danger onClick={(e) => getUserId(e)}>
              Delete
            </Button>
          </Popconfirm>
          ,
        </Space>
      ),
    },
  ];
  const getUser = async () => {
    await axios
      .get("http://localhost:8000/api/user/getTable")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getHistory = async () => {
    await axios
      .get("http://localhost:8000/api/history/getTable")
      .then((res) => {
        setHistoryList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    const data = [];
    userList?.forEach((item) => {
      data.push({
        key: item.id,
        userId: item.id,
        name: item.name,
        email: item.account,
        password: item.password,
      });
    });
    setTable(data);
    setLoading(false);
    getHistory();
  }, [JSON.stringify(userList)]);

  useEffect(() => {
    if (!token || !admin.id) {
      return navigate("/LoginAdmin");
    }
  });

  return (
    <div className={cx("home-admin")}>
      {contextHolder}
      <Header
        setUser={setAdmin}
        user={admin}
        admin
        messageApi={messageApi}
      ></Header>
      <h1 className={cx("table-title")}>Thông tin người dùng</h1>
      <Table
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
        }}
        dataSource={table}
      />
      {openModal && (
        <EditInfoUser
          openModal={openModal}
          setIsModalOpen={setOpenModal}
          user={
            userList.filter((item) => {
              return item.id === currentId;
            })[0]
          }
          onEdit
          messageApi={messageApi}
          setUserList={setUserList}
        ></EditInfoUser>
      )}
    </div>
  );
}

export default HomeAdmin;
