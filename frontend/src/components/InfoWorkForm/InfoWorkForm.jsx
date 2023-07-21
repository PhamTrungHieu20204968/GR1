import classNames from "classnames/bind";
import { useState } from "react";
import { Input, DatePicker, Form, Select, Modal } from "antd";
import axios from "axios";
import * as dayjs from "dayjs";

import styles from "./InfoWorkForm.scss";
import { useStateContext } from "../../contexts/ContextProvider";

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
  callBack,
  work,
  setWorks,
  messageApi,
  onEdit = false,
}) {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const { user } = useStateContext();
  const [setOpenModal, setOnEdit] = callBack;

  const submitData = async (data) => {
    const { name, description, time, type } = data;
    await axios
      .post("http://localhost:8000/api/work/update", {
        workId: work.id,
        userId: 1,
        name,
        description,
        type,
        timeStart: time[0].toDate("Y-m-d H:i:s"),
        timeEnd: time[1].toDate("Y-m-d H:i:s"),
      })
      .then((res) => {
        setWorks((prev) => {
          prev.filter((item) => {
            if (item.id === work.id) return res.data;
            return item;
          });
        });
        messageApi.open({
          type: "success",
          content: "Sửa thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOk = () => {
    if (!onEdit) setOpenModal(false);
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
      okText={onEdit ? "Lưu" : "OK"}
      afterClose={() => {
        if (onEdit) setOnEdit(false);
      }}
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
          initialValue={work?.name}
        >
          <Input disabled={!onEdit} />
        </Form.Item>
        <Form.Item
          name="time"
          label="Thời gian"
          {...rangeConfig}
          initialValue={[dayjs(work?.start), dayjs(work?.end)]}
        >
          <RangePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabled={!onEdit}
          />
        </Form.Item>
        <Form.Item name="type" label="Loại công việc" initialValue={work?.type}>
          <Select disabled={!onEdit}>
            <Option value="1">Công việc cá nhân</Option>
            <Option value="2">Công việc chia sẻ</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
          initialValue={work?.description}
        >
          <Input.TextArea disabled={!onEdit} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateWorkForm;
