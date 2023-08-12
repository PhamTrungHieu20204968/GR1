import Header from "../../components/Header/Header";
import axios from "axios";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { Badge, Space, Table, Button, Popconfirm, message } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import styles from "./HomeAdmin.module.scss";

const cx = classNames.bind(styles);

const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];

function HomeAdmin() {
  const [userList, setUserList] = useState([]);
  const [table, setTable] = useState();
  const [historyList, setHistoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentId, setCurrentId] = useState();
  const [messageApi, contextHolder] = message.useMessage();

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
    let i = 0;
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
      },
      {
        title: "Work id",
        dataIndex: "workID",
        key: "workID",
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          <Button type="primary">Edit</Button>
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
    userList.forEach((item) => {
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

  return (
    <div className={cx("home-admin")}>
      {contextHolder}
      <Header admin></Header>
      <h1 className={cx("table-title")}>Thông tin người dùng</h1>
      <Table
        loading={loading}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => expandedRowRender(record),
        }}
        dataSource={table}
      />
    </div>
  );
}

export default HomeAdmin;