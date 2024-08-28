import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as apiHelper from "../../helpers/api";
import * as stringConstants from "../../constants/stringConstants";
import { warn, success, error } from "../../helpers/toast";
import { USER_DATA } from "../../constants/appConstants";
import Text from "../../_widgets/Text/Text";
import { Form, Row, Col, InputGroup, Image } from "react-bootstrap";
import IconResource from "../../_widgets/IconResource/IconResource";
import "./login.scss";
import loginImage from "../../assets/login_right.png";
import Button from "../../_widgets/Button/Button";
import Input from "../../_widgets/Input/Input";
import { isEmployee } from "../../helpers"
import { isEmailValid, isNullOrEmpty } from "../../utils";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialLoginData = { email: "", password: "", };
    const [loginData, setLoginData] = useState(initialLoginData);
    const [loading, setLoading] = useState(false);

    const login = async (e) => {
        e.preventDefault();

        if (!loading) {
            if (isNullOrEmpty(loginData.email)) {
                warn(stringConstants.EMAIL_REQUIRED);
            } else if (!isEmailValid(loginData.email)) {
                warn(stringConstants.INCORRECT_EMAIL);
            } else if (isNullOrEmpty(loginData.password)) {
                warn(stringConstants.PASSWORD_REQUIRED);
            } else if (loginData.password.length < 6) {
                warn(stringConstants.INVALID_PASSWORD);
            } else {
                setLoading(true);
                const response = await apiHelper.login({ email: loginData.email, password: loginData.password });
                console.log("here> res", response);

                if (response?.ok) {
                    localStorage.setItem(USER_DATA, JSON.stringify(response.data));
                    navigate(isEmployee() ? '/employees' : '/departments');
                    success(response?.message);
                } else {
                    error(response?.message);
                }
                setLoading(false);
            }
        };
    }

    return (
        <div className="vh100 bg_primary">
            <Row className="h-100 mx-0 flex-column-reverse flex-md-row">
                <Col md={7} className="bg-white rounded_right">
                    <div className="d-flex align-items-center justify-content-between h-100 position-relative">
                        {location.pathname !== "/" ? (
                            <div className="back_btn">
                                <Button buttonType="icon" icon={<IconResource type='back' />} />
                            </div>
                        ) : ("")}
                        <div className="login_form m-auto w-100">
                            <Text
                                className="login_header"
                                type={"h1"}
                                text={'Welcome to EMS'}
                            />
                            <Text
                                className="login_sub_heading"
                                type={"small"}
                                text="Enter your details to proceed further"
                            />

                            <Form className="mt-6">
                                <Form.Label aria-label="Email Adress">
                                    Email Address
                                </Form.Label>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter your Email"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        type="email"
                                        value={loginData.email}
                                        autoComplete="false"
                                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    />
                                    <InputGroup.Text id="basic-addon2">
                                        <IconResource type="envelope" size={16} />
                                    </InputGroup.Text>
                                </InputGroup>

                                <Input
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                    value={loginData.password}
                                    inputType="password"
                                    label="Password"
                                />

                                <div className="mx-0 mt-4 d-flex flex-wrap align-items-center justify-content-between">
                                    <Link className="login_link" to={"/register"}>
                                        New to EMS? Register
                                    </Link>
                                </div>

                                <div className="mt-4">
                                    <Button
                                        buttonType={"primary"}
                                        onClick={login}
                                        text="Sign In"
                                        isLoading={loading}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>

                <Col md={5}>
                    <div className="w-100 h-100 overflow-hidden side_image">
                        <Image src={loginImage} className="img-fluid w-100 h-100" />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
