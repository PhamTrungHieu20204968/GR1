import classNames from "classnames/bind";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

import styles from "./WorkCard.module.scss";
import "./WorkLibrary.scss";

const cx = classNames.bind(styles);

function WorkCard({ type = "default", showModal }) {
  return (
    <div>
      {type === "default" ? (
        <Card
          title="Card title"
          style={{ height: "254px", display: "flex", flexDirection: "column" }}
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="delete" />,
          ]}
          hoverable
        >
          <div className={cx("card-body")}>
            <p className={cx("description")}>
              Cards usually cooperate with grid column layout in overview page.
              Cards usually cooperate with grid column layout in overview page.
              Cards usually cooperate with grid column layout in overview page.
              Cards usually cooperate with grid column layout in overview page.
              Cards usually cooperate with grid column layout in overview page.
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
