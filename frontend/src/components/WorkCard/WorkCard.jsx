import classNames from "classnames/bind";
import { Card, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

import styles from "./WorkCard.module.scss";
import "./WorkLibrary.scss";
import InfoWorkForm from "../../components/InfoWorkForm/InfoWorkForm";

const cx = classNames.bind(styles);

function WorkCard({ type = "default", showModal, work, setWorks, messageApi }) {
  const [openInfor, setOpenInfor] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const showInfor = (e) => {
    setOpenInfor(true);
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
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
            <EditOutlined
              key="edit"
              onClick={(e) => {
                e.stopPropagation();
                setOnEdit(true);
                showInfor();
              }}
            />,
            <Popconfirm
              title="Xóa công việc"
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
              <DeleteOutlined
                key="delete"
                onClick={(event) => event.stopPropagation()}
              />
            </Popconfirm>,
          ]}
          hoverable
          onClick={showInfor}
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

      <InfoWorkForm
        openModal={openInfor}
        callBack={[setOpenInfor, setOnEdit]}
        work={work}
        setWorks={setWorks}
        messageApi={messageApi}
        onEdit={onEdit}
      ></InfoWorkForm>
    </div>
  );
}

export default WorkCard;
