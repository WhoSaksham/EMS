import Text from '../Text/Text';
import BasicModal from './BasicModal';

const ModalConfirmation = ({ size = 'sm', show, handleClose, heading, buttonLoading, button1Click, button1Text, childrenText, children }) => {
    return (
        <>
            <BasicModal
                size={size}
                show={show}
                handleClose={handleClose}
                heading={heading}
                loading={buttonLoading}
                footer={button1Click}
                button1Click={button1Click}
                button1Text={button1Text}
            >
                {!children && <Text text={childrenText || 'Are you sure you want to perform this action?'} />}

                {children}
            </BasicModal>
        </>
    )
}

export default ModalConfirmation;
