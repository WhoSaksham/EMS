import { useState } from "react";
import "./input.scss";
import IconResource from "../IconResource/IconResource";
import { Form, InputGroup } from "react-bootstrap";

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const { isRequired, ...updatedProps } = props;

  const render = () => {
    switch (props?.inputType) {
      case "password":
        return (
          <>
            <Form.Label className={isRequired ? "is-required" : ""} aria-label="password">
              {props?.label ? props?.label : "Password"}
            </Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                autoComplete="false"
                pattern={props?.pattern}
                placeholder={
                  props?.placeholder
                    ? props?.placeholder
                    : "Enter your Password"
                }
                aria-label="password"
                aria-describedby="basic-addon2"
                type={showPassword ? "text" : "password"}
                {...updatedProps}
              />
              <InputGroup.Text
                id="basic-addon2"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                style={{ cursor: "pointer" }}
              >
                <IconResource type={showPassword ? "unlock" : "lock"} size={20} />
              </InputGroup.Text>
            </InputGroup>
          </>
        );
      case "icon":
        return (
          <>
            {props?.label ? (
              <Form.Label className={isRequired ? "is-required" : ""} aria-label={props?.label}>{props?.label}</Form.Label>
            ) : (
              ""
            )}
            <InputGroup className="mb-3">
              {props?.prefixIcon ? (
                <InputGroup.Text
                  id="basic-addon2"
                  style={{ cursor: 'pointer' }}
                >
                  <IconResource type={props?.prefixIcon} />
                </InputGroup.Text>
              ) : (
                ""
              )}
              <Form.Control
                placeholder={props?.placeholder}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text"
                pattern={props?.pattern}
                {...updatedProps}
              />
              {props?.suffixIcon ? (
                <InputGroup.Text
                  id="basic-addon2"
                >
                  <IconResource
                    type={props?.suffixIcon}
                  />
                </InputGroup.Text>
              ) : (
                ""
              )}
            </InputGroup>
          </>
        );
      default:
        return (
          <div>
            {props?.label ? (<Form.Label className={isRequired ? "is-required" : ""} aria-label={props?.label}>{props?.label}</Form.Label>) : ("")}
            <InputGroup className="mb-3">
              {props?.prefixIcon ? (
                <InputGroup.Text
                  id="basic-addon2"
                >
                  <IconResource
                    type={props?.prefixIcon}
                    color={"var(--light-text)"}
                  />
                </InputGroup.Text>
              ) : (
                ""
              )}
              <Form.Control
                placeholder={props?.placeholder}
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                type="text"
                required={props?.required}
                pattern={props?.pattern}
                {...updatedProps}
              />
              {props?.suffixIcon ? (
                <InputGroup.Text
                  id="basic-addon2"
                  style={{ cursor: 'pointer' }}
                >
                  <IconResource
                    type={props?.suffixIcon}
                    color={"var(--light-text)"}
                  />
                </InputGroup.Text>
              ) : (
                ""
              )}
            </InputGroup>
          </div>
        );
    }
  };
  return <>{render()}</>;
};

export default Input;
