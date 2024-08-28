import "../Login/login.scss";
import { useState } from "react";
import * as apiHelper from "../../helpers/api";
import { useNavigate } from "react-router-dom";
import * as stringConstants from "../../constants/stringConstants";
import { isNullOrEmpty, isEmailValid } from "../../utils";
import Text from "../../_widgets/Text/Text";
import { Form, Row, Col, Image, InputGroup } from "react-bootstrap";
import IconResource from "../../_widgets/IconResource/IconResource";
import { Link } from "react-router-dom";
import loginImage from "../../assets/login_right.png";
import Button from "../../_widgets/Button/Button";
import Input from "../../_widgets/Input/Input";
import { warn, error, success } from "../../helpers/toast";
import { EMPLOYEE, MANAGER, USER_DATA } from "../../constants/appConstants";
import { isEmployee } from "../../helpers";

const Register = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState('');
    const initialRegisterData = {
        name: "",
        email: "",
        password: "",
        location: "",
        role: EMPLOYEE,
    }
    const [registerData, setRegisterData] = useState(initialRegisterData);

    const register = (e) => {
        e.preventDefault();
        const { name, location, email, password, role } = registerData;

        if (isNullOrEmpty(name)) {
            warn(stringConstants.NAME_REQUIRED());
        } else if (isNullOrEmpty(location)) {
            warn(stringConstants.LOCATION_REQUIRED);
        } else if (isNullOrEmpty(email)) {
            warn(stringConstants.EMAIL_REQUIRED);
        } else if (!isEmailValid(email)) {
            warn(stringConstants.INCORRECT_EMAIL);
        } else if (isNullOrEmpty(password)) {
            warn(stringConstants.PASSWORD_REQUIRED);
        } else if (password.length < 6) {
            warn(stringConstants.INVALID_PASSWORD);
        } else {
            setLoading('mainLoading');
            apiHelper.register({ name, location, email, password, role }).then(response => {
                setLoading('');
                if (response?.ok) {
                    localStorage.setItem(USER_DATA, JSON.stringify(response.data));
                    navigate(isEmployee() ? '/employees' : '/departments');
                    success(response?.message);
                } else {
                    error(response?.message);
                }
            });
        }
    };

    return (
        <div className="vh100 bg_primary">
            <Row className="h-100 mx-0 flex-column flex-lg-row">
                <Col lg={5}>
                    <div className="w-100 h-100 overflow-hidden side_image">
                        <Image src={loginImage} className="img-fluid w-100 h-100" />
                    </div>
                </Col>
                <Col lg={7} className="bg-white rounded_right">
                    <div className="d-flex align-items-center justify-content-between  h-100 position-relative">
                        {window.location.pathname !== "/" ? (
                            <div className="back_btn">
                                <Button buttonType="icon" style={{ position: 'absolute' }} icon={<IconResource type='back' />} onClick={() => navigate('/')} />
                            </div>
                        ) : ("")}

                        <div className="login_form m-auto" style={{ maxWidth: "500px", width: "497px" }}>
                            <Text
                                className="login_header mt-5"
                                type={"h1"}
                                text="Register to EMS"
                            />
                            <Text
                                className="login_sub_heading"
                                type={"small"}
                                text="Enter your details to proceed further"
                            />
                            <Form className="mt-5 w-100">
                                <Row>
                                    <Col lg={6}>
                                        <Input
                                            label="Name"
                                            placeholder='Enter your Name'
                                            isRequired
                                            value={registerData.name}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 50) {
                                                    setRegisterData({ ...registerData, name: e.target.value });
                                                } else {
                                                    warn(stringConstants.maximumLengthAllowed(50));
                                                }
                                            }}
                                        />
                                    </Col>
                                    <Col lg={6}>
                                        <Input
                                            label="Location"
                                            placeholder='Enter your Location'
                                            value={registerData.location}
                                            isRequired
                                            onChange={(e) => {
                                                if (e.target.value.length <= 50) {
                                                    setRegisterData({ ...registerData, location: e.target.value });
                                                } else {
                                                    warn(stringConstants.maximumLengthAllowed(50));
                                                }
                                            }}
                                        />
                                    </Col>

                                    <Form.Label aria-label="Email Adress">
                                        Email Address
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Enter your Email"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            type="email"
                                            autoComplete="false"
                                            value={registerData.email}
                                            onChange={(e) => {
                                                if (e.target.value.length <= 30) {
                                                    setRegisterData({ ...registerData, email: e.target.value });
                                                } else {
                                                    warn(stringConstants.maximumLengthAllowed(30));
                                                }
                                            }}
                                        />
                                        <InputGroup.Text id="basic-addon2">
                                            <IconResource type="envelope" size={16} />
                                        </InputGroup.Text>
                                    </InputGroup>

                                    <Input
                                        inputType="password"
                                        label="Password"
                                        value={registerData.password}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 30) {
                                                setRegisterData({ ...registerData, password: e.target.value });
                                            } else {
                                                warn(stringConstants.maximumLengthAllowed(30));
                                            }
                                        }}
                                    />
                                </Row>

                                <div className="mx-0 mt-4 d-flex flex-wrap align-items-center justify-content-between">
                                    <Col md={6} className="ps-0 text-start  ">
                                        <Form.Check
                                            type="checkbox"
                                            id='default-radio'
                                            checked={registerData.role === MANAGER}
                                            label='Register as Manager'
                                            className="text-black"
                                            onChange={(e) => setRegisterData({ ...registerData, role: e.target.checked ? MANAGER : EMPLOYEE })}
                                        />
                                    </Col>
                                    <Link className="login_link" to={"/"}>
                                        Already have an Account? Login
                                    </Link>
                                </div>

                                <div className="mt-4">
                                    <Button
                                        buttonType={"primary"}
                                        onClick={register}
                                        text="Sign Up"
                                        isLoading={loading}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Register;
