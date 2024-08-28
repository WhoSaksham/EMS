import Button from "../Button/Button";
import Text from "../Text/Text";
import IconResource from "../IconResource/IconResource";

const NavBar = ({
  heading,
  onClick,
  button,
  buttonIcon,
  buttonIconsuff,
  setModalShow,
  Icon,
  button2,
  buttonIcon2,
  buttonIconsuff2,
  button2Click,
  button3,
  buttonIcon3,
  buttonIconsuff3,
  button3Click,
}) => {
  const rightButtonHandler = () => {
    setModalShow(true);
  };
  return (
    <>
      <div className="nav_bar">
        <div className="start">
          <Button
            buttonType="icon"
            icon={<IconResource type={Icon} size={20} />}
            color="black"
            onClick={onClick}
          />
          <Text type="h2" text={heading} />
        </div>
        <div className="d-flex align-items-center gap-2">
          {button ? (
            <Button
              buttonType="primary"
              prefixIcon={
                buttonIcon ? <IconResource type={buttonIcon} size={18} /> : ""
              }
              suffixIcon={
                buttonIconsuff ? (
                  <IconResource type={buttonIconsuff} size={18} />
                ) : (
                  ""
                )
              }
              text={button}
              onClick={rightButtonHandler}
            />
          ) : null}
          {button2 ? (
            <Button
              buttonType="primary"
              prefixIcon={
                buttonIcon2 ? <IconResource type={buttonIcon2} size={18} /> : ""
              }
              suffixIcon={
                buttonIconsuff2 ? (
                  <IconResource type={buttonIconsuff2} size={18} />
                ) : (
                  ""
                )
              }
              text={button2}
              onClick={button2Click}
            />
          ) : null}
          {button3 ? (
            <Button
              buttonType="primary"
              prefixIcon={
                buttonIcon3 ? <IconResource type={buttonIcon3} size={18} /> : ""
              }
              suffixIcon={
                buttonIconsuff3 ? (
                  <IconResource type={buttonIconsuff3} size={18} />
                ) : (
                  ""
                )
              }
              text={button3}
              onClick={button3Click}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NavBar;
