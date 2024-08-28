import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { Modal } from "react-bootstrap";
import "./modal.scss";
import IconResource from "../IconResource/IconResource";

const BasicModal = ({
    show,
    handleClose,
    heading,
    children,
    footer,
    button1Click,
    button1Text,
    button2Text,
    button2Click,
    size,
    formID,
    minH,
    maxH,
    loading,
    loading2,
    headingBtn
}) => {
    const modalBodyRef = useRef(null);
    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
        if (modalBodyRef.current) {
            const hasVerticalScrollbar =
                modalBodyRef.current.scrollHeight > modalBodyRef.current.clientHeight;
            setHasScroll(hasVerticalScrollbar);
        }
    }, [show]);

    const handleScrollToBottom = () => {
        if (modalBodyRef.current) {
            const scrollHeight = modalBodyRef.current.scrollHeight;
            const clientHeight = modalBodyRef.current.clientHeight;
            const maxScrollTop = scrollHeight - clientHeight;
            modalBodyRef.current.scrollTo({
                top: maxScrollTop,
                behavior: "smooth",
            });
        }
        setHasScroll(false);
    };

    return (
        <Modal backdrop='static' centered size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className={`d-flex align-items-center ${headingBtn ? 'gap-2' : ''}`}>
                        {heading}{headingBtn}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ minHeight: minH, maxHeight: maxH }} ref={modalBodyRef}>{children}</Modal.Body>
            {footer ? (
                <Modal.Footer>
                    {handleClose ? (
                        <Button
                            buttonType="secondary"
                            text="Cancel"
                            onClick={handleClose}
                        />
                    ) : null}
                    {button1Click ? (
                        <Button
                            buttonType="primary"
                            text={button1Text}
                            onClick={button1Click}
                            for={formID}
                            type="submit"
                            isLoading={loading}
                        />
                    ) : null}
                    {button2Click ? (
                        <Button
                            buttonType="primary"
                            text={button2Text}
                            onClick={button2Click}
                            for={formID}
                            type="submit"
                            isLoading={loading2 ? loading2 : loading ? loading : null}
                        />
                    ) : null}
                    {hasScroll ? (
                        <div className="scroll_down" style={{ zIndex: 100 }}>
                            <Button
                                onClick={handleScrollToBottom}
                                buttonType="icon"
                                icon={
                                    <IconResource type="arrowDown" color="var(--primary)" />
                                }
                            />
                        </div>
                    ) : null}
                </Modal.Footer>
            ) : (
                ""
            )}
        </Modal>
    );
};

export default BasicModal;
