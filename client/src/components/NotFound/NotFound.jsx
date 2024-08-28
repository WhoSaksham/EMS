import Text from "../../_widgets/Text/Text";
import { Image } from "react-bootstrap";
import "../Login/login.scss";
import notFoundImg from "../../assets/not_found.png";
import Button from "../../_widgets/Button/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="vh100">
            <div className="h-100 d-flex align-items-center justify-content-around">
                <div>
                    <div className="w-100 h-100 overflow-hidden side_image">
                        <Image src={notFoundImg} className="img-fluid" width={350} />
                    </div>
                </div>

                <div className="bg-white rounded_right">
                    <div className="d-flex align-items-center justify-content-between h-100 position-relative">
                        <div className="login_form m-auto d-flex align-items-center flex-column gap-3">
                            <div>
                                <Text
                                    className="login_header"
                                    type={"h1"}
                                    text="We seem you have lost"
                                />
                                <Text
                                    className="login_sub_heading"
                                    type={"small"}
                                    text="Or the page you're trying to access is no longer there!"
                                />
                            </div>
                            <Button buttonType="outline" text='Back' onClick={() => navigate(-1)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
