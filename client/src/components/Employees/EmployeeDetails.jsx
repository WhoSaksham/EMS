import { useEffect, useState } from "react";
import { warn } from "../../helpers/toast";
import * as apiHelper from "../../helpers/api";
import Text from "../../_widgets/Text/Text";
import noData from "../../assets/noData.png";
import NavBar from "../../_widgets/NavBar/NavBar";
import { Table } from "react-bootstrap";
import MainLoader from "../../_widgets/Loader/MainLoader";
import AnimatedPage from "../../_widgets/AnimatedPage/AnimatedPage";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeDetails = () => {
    const navigate = useNavigate();
    const { eId } = useParams();

    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    const getEmployeeDetails = () => {
        if (!loading) {
            setLoading(true);

            apiHelper.getEmployeeDetails(eId).then(response => {
                if (response?.ok) {
                    setEmployeeData(response?.data);
                } else {
                    warn(response?.message);
                }
                setLoading(false);
            });
        }
    }

    return (
        <AnimatedPage>

            <NavBar
                buttonIcon="users"
                heading="Employee Details"
                onClick={() => navigate('/employees')}
                Icon="back"
            />

            <div className="patient_list white_card">
                <div className="top_bar">
                    <Text type="h2" text="Employees Details" />
                </div>

                <div className="custom_table position-relative">
                    {loading
                        ? (<MainLoader />)
                        : EmployeeDetails ? (
                            <div>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th>Key</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Employee ID</td>
                                            <td>{employeeData?._id || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Employee Name</td>
                                            <td>{employeeData?.name || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Employee Location</td>
                                            <td>{employeeData?.location || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Employee Department</td>
                                            <td>{employeeData?.assignedDepartment || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>Employee Email</td>
                                            <td>{employeeData?.email || '-'}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        ) : (<>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Key</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </Table>
                            <div className="no_data position-relative">
                                <img
                                    src={noData}
                                    className="img-fluid"
                                    style={{ width: "300px" }}
                                />
                                <Text type="h2" text="There is no data to display." />
                            </div>
                        </>)}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default EmployeeDetails;
