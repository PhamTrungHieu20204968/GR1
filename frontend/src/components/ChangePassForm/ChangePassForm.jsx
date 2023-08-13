import classNames from "classnames/bind";
import { useState } from "react";
import { Input, Form, Modal } from "antd";
import axios from "axios";

import styles from "./ChangePassForm.module.scss";

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

function ChangePassForm({
  openModal,
  messageApi,
  userId,
  setIsModalOpen,
  admin = false,
}) {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [id, setId] = useState(userId);
  const [accountValidateStatus, setAccountValidateStatus] = useState();
  const [passValidateStatus, setPassValidateStatus] = useState();

  const handleOk = () => {
    setConfirmLoading(true);
    form
      .validateFields()
      .then((values) => {
        try {
          if (!id) {
            getId(values);
          } else {
            submitForm(values);
          }
          setTimeout(() => {
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

  const getId = async (values) => {
    const { account } = values;
    const api = admin
      ? "http://localhost:8000/api/admin/getId"
      : "http://localhost:8000/api/user/getId";
    await axios
      .post(api, {
        account,
      })
      .then((res) => {
        if (res.data[0]?.id) {
          setId(res.data[0]?.id);
        } else setAccountValidateStatus("error");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = async (values) => {
    const { newPass, reNewPass } = values;
    if (newPass !== reNewPass) {
      setPassValidateStatus("error");
      return;
    }
    const api = admin
      ? "http://localhost:8000/api/admin/changePass"
      : "http://localhost:8000/api/user/changePass";
    await axios
      .post(api, {
        id: id,
        pass: newPass,
      })
      .then((res) => {
        messageApi.open({
          type: "success",
          content: "Cập nhật thành công!",
        });
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={id ? "Đổi mật khẩu" : "Quên mật khảu"}
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={"Ok"}
    >
      <Form
        name="change_pass_form"
        {...formItemLayout}
        style={{
          maxWidth: 600,
        }}
        form={form}
        labelWrap
      >
        {!id ? (
          <Form.Item
            name="account"
            label="Tên tài khoản"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập!",
              },
            ]}
            validateStatus={accountValidateStatus}
            help={accountValidateStatus ? "Tài khoản không đúng" : ""}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name="newPass"
              label="Mật khẩu mới"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập!",
                },
                {
                  min: 8,
                  message: "Mật khẩu phải lớn hơn 8 ký tự!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="reNewPass"
              label="Nhập lại mật khẩu mới"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập!",
                },
                {
                  min: 8,
                  message: "Mật khẩu phải lớn hơn 8 ký tự!",
                },
              ]}
              validateStatus={passValidateStatus}
              help={passValidateStatus ? "Mật khẩu không giống nhau" : ""}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
}

export default ChangePassForm;
