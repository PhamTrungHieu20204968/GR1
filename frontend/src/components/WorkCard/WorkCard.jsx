import classNames from "classnames/bind";
import { Card, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";

import styles from "./WorkCard.module.scss";
import "./WorkLibrary.scss";

const cx = classNames.bind(styles);

function WorkCard({ type = "default", showModal, work, setWorks, messageApi }) {
  const handleDelete = async () => {
    await axios
      .post("http://localhost:8000/api/work/delete", {
        workId: work.id,
      })
      .then((res) => {
        setWorks((prev) => {
          return prev.filter((item, index) => {
            if (item.id !== work.id) return item;
          });
        });
        messageApi.open({
          type: "success",
          content: "Xóa thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {type === "default" ? (
        <Card
          title={work.name}
          style={{
            height: "254px",
            display: "flex",
            flexDirection: "column",
          }}
          actions={[
            <EditOutlined key="edit" />,
            <Popconfirm
              title="Xóa công việc"
              description="Bạn có chắc chắn muốn xóa?"
              onConfirm={handleDelete}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>,
          ]}
          hoverable
        >
          <div className={cx("card-body")}>
            <p className={cx("description")}>
              {"Deadline: "} <b>{work.start.slice(0, 11)}</b>
              <br></br>
              {work.description || (
                <span style={{ color: "#ccc" }}>Không có mô tả</span>
              )}
            </p>
          </div>
        </Card>
      ) : (
        <Card
          className={cx("card")}
          style={{ height: "254px" }}
          onClick={showModal}
        >
          <div className={cx("add-card")}>
            <PlusOutlined style={{ fontSize: "5rem", padding: "32px" }} />
          </div>
        </Card>
      )}
    </div>
  );
}

export default WorkCard;
