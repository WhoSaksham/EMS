import Text from "../Text/Text";
import "./Button.scss";
import Loader from "react-spinners/ClipLoader";

const Button = (props) => {
  const updatedProps = {
    ...props,
  };

  const renderButton = () => {
    switch (props?.buttonType) {
      case "primary":
        return (
          <>
            <button
              className="btn emr-btn__primary"
              {...updatedProps}
              ref={props?.buttonRef}
            >
              {props?.prefixIcon}
              {props?.isLoading ? (
                <Loader color="#ffffff" size={14} />
              ) : (
                props?.text
              )}
              {props?.suffixIcon}
            </button>
          </>
        );
      case "secondary":
        return (
          <>
            <button className="btn emr-btn__secondary" {...updatedProps}>
              {props?.prefixIcon}
              {props?.text}
              {props?.suffixIcon}
            </button>
          </>
        );
      case "light":
        return (
          <>
            <button className="btn emr-btn__light" {...updatedProps}>
              {props?.prefixIcon} {props?.text} {props?.suffixIcon}
            </button>
          </>
        );
      case "icon":
        return (
          <>
            <button className="btn emr-btn__light" {...updatedProps}>
              {props?.icon} <Text text={props?.text} />
            </button>
          </>
        );
      case "danger":
        return (
          <>
            <button className="btn emr-btn__danger" {...updatedProps}>
              {props?.prefixIcon}  {props?.isLoading ? (
                <Loader color="#ffffff" size={14} />
              ) : (
                props?.text
              )} {props?.suffixIcon}
            </button>
          </>
        );
      case "outline":
        return (
          <>
            <button className="btn emr-btn__outline" {...updatedProps}>
              {props?.isLoading ? (
                <Loader color="var(--primary)" size={14} />
              ) : (
                <>
                  {props?.prefixIcon} {props?.text} {props?.suffixIcon}
                </>
              )}
            </button>
          </>
        );
      case "button":
        return (
          <>
            <button className="btn emr-btn__apply" {...updatedProps}>
              {props?.text} {props?.icon}
            </button>
          </>
        );
      case "dropdown":
        return (
          <>
            <button className="btn emr-btn__dropdown" {...updatedProps}>
              {props?.text} {props?.icon}
            </button>
          </>
        );
      case "text":
        return (
          <>
            <button className="btn emr-btn__text" {...updatedProps}>
              {props?.text}
            </button>
          </>
        );
      case "amountBtn":
        return (
          <>
            <button
              className="quickAmt no-border btn btn-xs btn-outline-secondary"
              {...updatedProps}
            >
              {props?.text}
            </button>
          </>
        );
      default:
        return (
          <>
            <button
              className="primary btn"
              ref={props?.buttonRef}
              {...updatedProps}
            >
              {props?.text} {props?.icon}
            </button>
          </>
        );
    }
  };

  return <>{renderButton()}</>;
};

export default Button;
