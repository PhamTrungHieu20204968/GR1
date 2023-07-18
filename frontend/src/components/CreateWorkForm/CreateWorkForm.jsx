import classNames from "classnames/bind";
import { useState } from "react";
import { Input, DatePicker, Form, Select, Modal, message } from "antd";
import axios from "axios";

import styles from "./CreateWorkForm.scss";

const cx = classNames.bind(styles);

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Vui lòng nhập!",
    },
  ],
};

function CreateWorkForm({ openModal, setOpenModal, userId }) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const submitData = async (data) => {
    const { name, description, time, type } = data;
    await axios
      .post("http://localhost:8000/api/work/create", {
        userId,
        name,
        description,
        type,
        timeStart: time[0].toDate("Y-m-d H:i:s"),
        timeEnd: time[1].toDate("Y-m-d H:i:s"),
      })
      .then((res) => {
        console.log(res);
        messageApi.open({
          type: "success",
          content: "Tạo thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        try {
          submitData(values);
          form.resetFields();
          setTimeout(() => {
            setOpenModal(false);
            setConfirmLoading(false);
          }, 500);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((info) => {
        setConfirmLoading(false);
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenModal(false);
  };

  return (
    <Modal
      title="Tạo công việc"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {contextHolder}
      <Form
        name="create_work_form"
        {...formItemLayout}
        style={{
          maxWidth: 600,
        }}
        form={form}
      >
        <Form.Item
          name="name"
          label="Tên công việc"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="time" label="Thời gian" {...rangeConfig}>
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item name="type" label="Loại công việc" initialValue="1">
          <Select>
            <Option value="1">Công việc cá nhân</Option>
            <Option value="2">Công việc chia sẻ</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả" initialValue="">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateWorkForm;
