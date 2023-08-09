import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Input, DatePicker, Form, Select, Modal } from "antd";
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

function CreateWorkForm({
  openModal,
  setOpenModal,
  userId,
  setWorks,
  messageApi,
  setTab,
}) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const roles = [
    {
      value: "1",
      label: "Xem",
    },
    {
      value: "2",
      label: "Chỉnh sửa",
    },
    {
      value: "3",
      label: "Xóa",
    },
  ];
  const [workType, setWorkType] = useState("1");
  const submitData = async (data) => {
    const { name, description, time, type } = data;
    await axios
      .post("http://localhost:8000/api/work/create", {
        userId: 1,
        name,
        description,
        type,
        timeStart: time[0].toDate("Y-m-d H:i:s"),
        timeEnd: time[1].toDate("Y-m-d H:i:s"),
      })
      .then((res) => {
        setWorks((prev) => [...prev, res.data]);
        messageApi.open({
          type: "success",
          content: "Tạo thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitShare = async (data) => {
    const { name, description, time, type, role, share } = data;
    await axios
      .post("http://localhost:8000/api/work/createShare", {
        userId: 1,
        name,
        description,
        type,
        timeStart: time[0].toDate("Y-m-d H:i:s"),
        timeEnd: time[1].toDate("Y-m-d H:i:s"),
        role,
        share,
      })
      .then((res) => {
        setWorks((prev) => [...prev, res.data]);
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
          if (workType === "2") {
            submitShare(values);
            setTab("2");
          } else {
            submitData(values);
            setTab("1");
          }
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

  const getUser = async () => {
    await axios
      .post("http://localhost:8000/api/user/getAll", {
        userId: 1,
      })
      .then((res) => {
        const _options = [];
        res.data.forEach((item) => {
          _options.push({ value: item.account, label: item.account });
        });
        setOptions(_options);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Modal
      title="Tạo công việc"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
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
        <Form.Item name="type" label="Loại công việc" initialValue={workType}>
          <Select onChange={(value) => setWorkType(value)}>
            <Option value="1">Công việc cá nhân</Option>
            <Option value="2">Công việc chia sẻ</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Mô tả" initialValue="">
          <Input.TextArea />
        </Form.Item>
        {workType === "2" && (
          <>
            <Form.Item
              name="role"
              label="Phân quyền"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập!",
                },
              ]}
              initialValue={"1"}
            >
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Chọn quyền..."
                options={roles}
              />
            </Form.Item>
            <Form.Item
              name="share"
              label="Chia sẻ"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập!",
                },
              ]}
            >
              <Select
                mode="tags"
                style={{
                  width: "100%",
                }}
                placeholder="Email..."
                options={options}
              />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}

export default CreateWorkForm;
