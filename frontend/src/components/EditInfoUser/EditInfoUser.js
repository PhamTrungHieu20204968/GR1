import classNames from "classnames/bind";
import { useState } from "react";
import { Input, Form, Modal, Radio } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

import styles from "./EditInfoUser.module.scss";
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

function EditInfoUser({
  openModal,
  setIsModalOpen,
  messageApi,
  user,
  onEdit = false,
  setUserList,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setUser } = useStateContext();

  const submitForm = async (data) => {
    const { name, password, sex, age, email } = data;
    await axios
      .post("http://localhost:8000/api/user/updateOne", {
        userId: user.id,
        name,
        password,
        sex,
        age,
      })
      .then((res) => {
        if (setUserList) {
          setUserList((prev) => [
            ...prev,
            {
              userId: user.id,
              name,
              account: email,
              password,
              sex,
              age,
            },
          ]);
        } else
          setUser({
            userId: user.id,
            name,
            account: email,
            password,
            sex,
            age,
          });
        messageApi.open({
          type: "success",
          content: "Cập nhật thành công!",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOk = (data) => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        try {
          submitForm(values);
          form.resetFields();
          setTimeout(() => {
            setIsModalOpen(false);
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
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Thông tin người dùng"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={onEdit ? "Lưu" : "OK"}
    >
      {!loading ? (
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
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
            initialValue={user?.name}
          >
            <Input disabled={!onEdit} placeholder={"Không có"} />
          </Form.Item>

          <Form.Item name="email" label="Email" initialValue={user?.account}>
            <Input disabled={true} placeholder={"Không có"} />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
            initialValue={user?.password}
          >
            <Input disabled={!onEdit} placeholder={"Không có"} />
          </Form.Item>

          <Form.Item name="sex" label="Giới tính" initialValue={user?.sex}>
            <Radio.Group value={user?.sex}>
              <Radio value={0}>Nam</Radio>
              <Radio value={1}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="age" label="Tuổi" initialValue={user?.age}>
            <Input disabled={!onEdit} placeholder={"Không có"} />
          </Form.Item>
        </Form>
      ) : (
        <div className={cx("loading-icon")}>
          <LoadingOutlined />
        </div>
      )}
    </Modal>
  );
}

export default EditInfoUser;
