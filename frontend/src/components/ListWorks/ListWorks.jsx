import { Col, Row } from "antd";
import classNames from "classnames/bind";

import styles from "./ListWorks.module.scss";
import WorkCard from "../WorkCard/WorkCard";

const cx = classNames.bind(styles);

function ListWorks({ showModal }) {
  return (
    <Row gutter={[16, 16]} style={{ flexWrap: "wrap" }}>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={2}>
        <WorkCard></WorkCard>
      </Col>

      <Col xs={24} sm={12} md={12} lg={6} xl={4} order={1}>
        <WorkCard type="add" showModal={showModal}></WorkCard>
      </Col>
    </Row>
  );
}

export default ListWorks;
