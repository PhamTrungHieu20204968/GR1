import classNames from "classnames/bind";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col } from "react-bootstrap";
import { EyeTwoTone, EyeInvisibleTwoTone } from "@ant-design/icons";

import styles from "./Login.module.scss";
import LogoFaceBook from "../../assets/images/facebook.png";
import LogoGoogle from "../../assets/images/Gmail_Logo_512px.png";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accountError, setAccountError] = useState(false);
  const [accountErrorMessage, setAccountErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleChangeAccount = (e) => {
    setAccountError(false);
    setAccount(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPasswordError(false);
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (!account) {
      setAccountError(true);
      setAccountErrorMessage("Vui lòng nhập tài khoản");
    }
    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage("Vui lòng nhập mật khẩu");
    }

    if (account && password) {
      await axios
        .post("http://localhost:8000/api/user/login", {
          account: account,
          password: password,
        })
        .then((res) => {
          if (res.data === true) {
            Swal.fire({ title: "Đăng nhập thành công!", icon: "success" });
            navigate("/");
          } else {
            Swal.fire({
              title: "Đăng nhập thất bại!",
              text: "Vui lòng kiểm tra lại tài khoản và mật khẩu",
              icon: "error",
            });
            setAccountError(true);
            setAccountErrorMessage("");
            setPasswordError(true);
            setPasswordErrorMessage("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return (
    <div className={cx("login")}>
      <Container>
        <Row className="justify-content-md-center align-items-center">
          <Col md="4">
            <h1 className={cx("header")}>Đăng Nhập</h1>
            <div className={cx("form")}>
              <label className={cx("label")} htmlFor="account">
                Tài khoản
              </label>
              <input
                id="account"
                type="text"
                className={cx("form-input", accountError && "form-error")}
                value={account}
                onChange={handleChangeAccount}
              />
              {accountError && (
                <p className={cx("error-message")}>{accountErrorMessage}</p>
              )}
              <label className={cx("label")} htmlFor="account">
                Mật khẩu
              </label>

              <div className={cx("form-input-wrapper")}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={cx("form-input", passwordError && "form-error")}
                  value={password}
                  onChange={handleChangePassword}
                />
                {showPassword ? (
                  <EyeInvisibleTwoTone
                    className={cx("show-icon")}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeTwoTone
                    className={cx("show-icon")}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
              {passwordError && (
                <p className={cx("error-message")}>{passwordErrorMessage}</p>
              )}

              <div className={cx("form-btn")} onClick={handleSubmit}>
                Đăng nhập
              </div>

              <div className={cx("social-login")}>
                <h2 className={cx("label", "center")}>Hoặc tiếp tục với</h2>

                <div className={cx("social-logos")}>
                  <div className={cx("logo")}>
                    <img src={LogoFaceBook} alt="" />
                  </div>
                  <div className={cx("logo")}>
                    <img src={LogoGoogle} alt="" />
                  </div>
                </div>
              </div>

              <p className={cx("navigate-sign-up-text")}>
                Chưa có tài khoản? <Link to="/SignUp">Đăng ký</Link>
              </p>
              <h3 className={cx("forgot-pass-link")}>Quên mật khẩu?</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
