import { Col, Row } from "antd";
import classNames from "classnames/bind";

import styles from "./ListWorks.module.scss";
import WorkCard from "../WorkCard/WorkCard";

const cx = classNames.bind(styles);

function ListWorks({ showModal, works, setWorks, messageApi }) {
  return (
    <Row gutter={[16, 16]} style={{ flexWrap: "wrap" }}>
      {works?.map((work, index) => {
        console.log(work);
        return (
          <Col key={work.id} xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
            <WorkCard
              key={work.id}
              work={work}
              showModal={showModal}
              setWorks={setWorks}
              messageApi={messageApi}
            ></WorkCard>
          </Col>
        );
      })}
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={1}>
        <WorkCard type="add" showModal={showModal}></WorkCard>
      </Col>
    </Row>
  );
}

export default ListWorks;
