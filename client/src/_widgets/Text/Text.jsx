import React from "react";
import "./Text.scss";

const Text = (props) => {
  const render = () => {
    switch (props?.type) {
      case "h1":
        return (
          <>
            <h1
              style={{ fontSize: `var(${props?.fontSize})` }}
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h1>
          </>
        );
      case "h2":
        return (
          <>
            <h2
              style={{ fontSize: `var(${props?.fontSize})` }}
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h2>
          </>
        );
      case "h3":
        return (
          <>
            <h3
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h3>
          </>
        );
      case "h4":
        return (
          <>
            <h4
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h4>
          </>
        );
      case "h5":
        return (
          <>
            <h5
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h5>
          </>
        );
      case "h6":
        return (
          <>
            <h6
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></h6>
          </>
        );
      case "h7":
        return (
          <>
            <p
              className={`h7 ${props?.className ?? ""}`}
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></p>
          </>
        );
      case "t-icon":
        return (
          <>
            <p
              {...props}
              className={`d-flex align-items-center gap-2 ${props?.className ?? ""
                }`}
            >
              {props?.tIcon} {props?.text}
            </p>
          </>
        );
      case "small":
        return (
          <>
            <small
              style={{ display: "block" }}
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></small>
          </>
        );
      case "span":
        return (
          <>
            <span
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></span>
          </>
        );
      case "semi-bold":
        return (
          <>
            <p
              className={`h7 fw-semibold ${props?.className ?? ""}`}
              {...props}
              dangerouslySetInnerHTML={{ __html: props?.text }}
            ></p>
          </>
        );
      default:
        return (
          <>
            <p {...props} dangerouslySetInnerHTML={{ __html: props?.text }}></p>
          </>
        );
    }
  };

  return <>{render()}</>;
};

export default Text;
