import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { Input, DatePicker, Form, Select, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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

function InfoWorkForm({
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
  const [role, setRole] = useState("1");
  const [shareList, setShareList] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const { user } = useStateContext();
  const [setOpenModal, setOnEdit] = callBack;

  const submitData = async (data) => {
    if (!onEdit) return;

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
  const getShareList = async () => {
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/share/getShareList", {
        workId: work?.id,
      })
      .then((res) => {
        const _shareList = [];
        res.data.forEach((item) => {
          _shareList.push({ value: item.account, label: item.account });
        });
        setShareList(_shareList);
        setRole(res.data[0]?.role);
        form.setFieldValue("share", _shareList);
        form.setFieldValue("role", res.data[0]?.role);
      })
      .catch((err) => {
        console.error(err);
      });
    await getUser();
    setLoading(false);
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
    getShareList();
  }, []);

  return (
    <Modal
      title="Thông tin công việc"
      open={openModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      okText={onEdit ? "Lưu" : "OK"}
      afterClose={() => {
        if (onEdit) setOnEdit(false);
      }}
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
          <Form.Item
            name="type"
            label="Loại công việc"
            initialValue={work?.type}
          >
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
          {work?.type === "2" && (
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
                initialValue={role}
              >
                <Select
                  disabled={!onEdit}
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
                initialValue={shareList}
              >
                <Select
                  disabled={!onEdit}
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
      ) : (
        <div className={cx("loading-icon")}>
          <LoadingOutlined />
        </div>
      )}
    </Modal>
  );
}

export default InfoWorkForm;
