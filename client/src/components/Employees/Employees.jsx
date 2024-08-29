import { useEffect, useState } from "react";
import { warn, success, error } from "../../helpers/toast";
import * as apiHelper from "../../helpers/api";
import * as stringConstants from "../../constants/stringConstants";
import Text from "../../_widgets/Text/Text";
import Input from "../../_widgets/Input/Input";
import noData from "../../assets/noData.png";
import Button from "../../_widgets/Button/Button";
import NavBar from "../../_widgets/NavBar/NavBar";
import { Row, Col, Form, Table, Dropdown } from "react-bootstrap";
import CustomPagination from "../../_widgets/CustomPagination/CustomPagination";
import IconResource from "../../_widgets/IconResource/IconResource";
import MainLoader from "../../_widgets/Loader/MainLoader";
import AnimatedPage from "../../_widgets/AnimatedPage/AnimatedPage";
import BasicModal from "../../_widgets/Modal/BasicModal";
import { isEmailValid, isNullOrEmpty, slice } from "../../utils";
import ModalConfirmation from "../../_widgets/Modal/ModalConfirmation";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../_widgets/Dropdown/Dropdown";
import { DEPARTMENTS } from "../../constants/appConstants";
import { convertAndStoreDepartmentOptions, isEmployee } from "../../helpers";

const Employees = () => {
    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);
    const initialEmployeeData = {
        id: null,
        name: "",
        email: "",
        password: "",
        location: "",
        department: null,
        departmentOptions: [],
        action: "Add",
    };
    const [employeeData, setEmployeeData] = useState(initialEmployeeData);
    const [employeesList, setEmployeesList] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showAssignDepartmentModal, setShowAssignDepartmentModal] = useState(false);
    const [filters, setFilters] = useState({ location: "", name: "" });

    const handleClose = () => {
        setModalShow(false);
        setShowAssignDepartmentModal(false);
        setEmployeeData(prev => ({ ...initialEmployeeData, departmentOptions: prev.departmentOptions }));
    };

    const onPageChange = (page) => {
        if (page !== activePage) {
            setActivePage(page);
        }
    };

    useEffect(() => {
        getEmployeesList();
    }, [activePage, filters.location, filters.name]);

    const getEmployeesList = () => {
        if (!loading) {
            setLoading(true);

            apiHelper.getEmployees(`?page=${activePage}&location=${filters.location}&name=${filters.name}`).then(response => {
                if (response?.ok) {
                    setEmployeesList(response?.data);
                } else {
                    warn(response?.message);
                }
                setLoading(false);
            });
        }
    }

    const validateData = () => {
        const { name, email, password, location } = employeeData;

        if (isNullOrEmpty(name)) {
            warn(stringConstants.NAME_REQUIRED('Department'));
            return false;
        } else if (isNullOrEmpty(email)) {
            warn(stringConstants.EMAIL_REQUIRED);
            return false;
        } else if (!isEmailValid(email)) {
            warn(stringConstants.INCORRECT_EMAIL);
            return false;
        } else if (isNullOrEmpty(password)) {
            warn(stringConstants.PASSWORD_REQUIRED);
            return false;
        } else if (password.length < 6) {
            warn(stringConstants.INVALID_PASSWORD);
            return false;
        } else if (isNullOrEmpty(location)) {
            warn(stringConstants.LOCATION_REQUIRED);
            return false;
        }

        return true;
    };

    const handleEditClick = (data) => {
        const { _id, name, email, password, location, department } = data;
        setEmployeeData({ id: _id, name, email, password, location, department, action: "Edit" });
        setModalShow(true);
    }

    const upsertEmployee = () => {
        if (!buttonLoading) {
            if (validateData()) {
                setButtonLoading('upsert');
                const { id, name, email, password, location, action } = employeeData;

                apiHelper[action === 'Add' ? 'createEmployee' : 'updateEmployee'](id, { name, email, password, location }).then(response => {
                    if (response?.ok) {
                        getEmployeesList();
                        success(response.message);
                        handleClose();
                    } else {
                        error(response?.message);
                    }
                    setButtonLoading('');
                });
            }
        }
    }

    const handleDelete = () => {
        if (!buttonLoading) {
            setButtonLoading(true);
            const { id } = employeeData;
            apiHelper.deleteEmployee(id).then(response => {
                if (response?.ok) {
                    getEmployeesList();
                    success(response.message);
                    handleClose();
                    setShowConfirmModal(false);
                } else {
                    error(response?.message);
                }
                setButtonLoading(false);
            });
        }
    }

    useEffect(() => {
        getDepartmentoptions();
    }, []);

    const getDepartmentoptions = () => {
        if (!isEmployee()) {
            const localDepartmentOptions = JSON.parse(localStorage.getItem(DEPARTMENTS));

            if (Array.isArray(localDepartmentOptions && localDepartmentOptions?.length)) {
                setEmployeeData({ ...employeeData, localDepartmentOptions });
            } else {
                apiHelper.getDepartments(`?page=${activePage}`).then(response => {
                    if (response?.ok) {
                        const departmentOptions = convertAndStoreDepartmentOptions(response?.data?.items);
                        setEmployeeData({ ...employeeData, departmentOptions });
                    } else {
                        warn(response?.message);
                    }
                    setLoading(false);
                });
            }
        }
    }

    const handleAssignDepartent = () => {
        if (!buttonLoading) {
            setButtonLoading(true);
            const payload = {
                employeeID: employeeData.id,
                departmentID: employeeData.department,
            }
            apiHelper.assignDepartment(payload).then(response => {
                if (response?.ok) {
                    success(response.message);
                    handleClose();
                } else {
                    error(response?.message);
                }
            });
            setButtonLoading(false);
        }
    }

    const handleLocationFilterChange = (order) => {
        setFilters({ ...filters, location: order });
    };

    const handleNameFilterChange = (order) => {
        setFilters({ ...filters, name: order });
    };

    return (
        <AnimatedPage>

            <ModalConfirmation
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                heading='Delete Confirmation'
                buttonLoading={buttonLoading}
                button1Click={handleDelete}
                button1Text={'Delete'}
            />

            {/* Add/Edit Modal */}
            <BasicModal
                show={modalShow}
                size="lg"
                setModalShow={setModalShow}
                handleClose={handleClose}
                heading={`${employeeData.action} Employee`}
                footer
                formID="upsert-department"
                loading={buttonLoading === 'upsert'}
                button1Text="Save"
                button1Click={upsertEmployee}
            >
                <div className="card_ui">
                    <Row>
                        <Col xl={12}>
                            <div className="white_card text-start">
                                <Form id="add-patient-visit" noValidate>
                                    <Row>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Employee Name"
                                                type="text"
                                                label="Name"
                                                required
                                                isRequired
                                                value={employeeData.name}
                                                onChange={e => {
                                                    if (e.target.value.length <= 50) {
                                                        setEmployeeData({ ...employeeData, name: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(50));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Employee Location"
                                                type="text"
                                                label="Location"
                                                required
                                                isRequired
                                                value={employeeData.location}
                                                onChange={e => {
                                                    if (e.target.value.length <= 30) {
                                                        setEmployeeData({ ...employeeData, location: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(30));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Employee Email"
                                                type="text"
                                                label="Email"
                                                required
                                                isRequired
                                                value={employeeData.email}
                                                onChange={e => {
                                                    if (e.target.value.length <= 30) {
                                                        setEmployeeData({ ...employeeData, email: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(30));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Employee Password"
                                                type="text"
                                                label="Password"
                                                required
                                                isRequired
                                                value={employeeData.password}
                                                onChange={e => {
                                                    if (e.target.value.length <= 30) {
                                                        setEmployeeData({ ...employeeData, password: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(30));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </BasicModal>

            {/* Assign Department Modal */}
            <BasicModal
                show={showAssignDepartmentModal}
                size="lg"
                handleClose={handleClose}
                heading={`Assign Department to ${employeeData.name}`}
                footer
                formID="upsert-department"
                loading={buttonLoading}
                button1Text="Save"
                button1Click={handleAssignDepartent}
            >
                <div className="card_ui">
                    <Row>
                        <Col xl={12}>
                            <div className="white_card text-start">
                                <Form id="add-patient-visit" noValidate>
                                    <Row>
                                        <Form.Group as={Col} lg={12} sm={12}>
                                            <CustomDropdown
                                                isRequired
                                                label="Assign Department"
                                                placeholder="Department"
                                                options={employeeData.departmentOptions}
                                                name={employeeData?.department}
                                                onChange={option => setEmployeeData({ ...employeeData, department: option?.value })}
                                            />
                                        </Form.Group>
                                    </Row>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            </BasicModal>

            <NavBar
                button={"Add Employee"}
                buttonIcon="users"
                heading="Employees"
                onClick={() => document.body.classList.toggle("side_active")}
                setModalShow={setModalShow}
                Icon="menu"
            />

            <div className="patient_list white_card">
                <div className="top_bar">
                    <Text type="h2" text="All Employees List" />

                    <Row className="search_filter d-flex">
                        <Col lg={6}>
                            <div title="Location Filter">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="p-0 m-0 border-0"
                                        variant="transparent"
                                        id="dropdown-basic"
                                    >
                                        <Button buttonType='icon' icon={<IconResource type='filter' color='var(--primary)' />} text='Location Filter' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <Dropdown.Item onClick={() => handleLocationFilterChange('asc')}>
                                            <Form.Check
                                                type='radio'
                                                label='Ascending'
                                                id='location-asc'
                                                name='location-filter'
                                                checked={filters.location === 'asc'}
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleLocationFilterChange('desc')}>
                                            <Form.Check
                                                type='radio'
                                                label='Descending'
                                                id='location-desc'
                                                name='location-filter'
                                                checked={filters.location === 'desc'}
                                            />
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div title="Name Filter">
                                <Dropdown>
                                    <Dropdown.Toggle
                                        className="p-0 m-0 border-0"
                                        variant="transparent"
                                        id="dropdown-basic"
                                    >
                                        <Button buttonType='icon' icon={<IconResource type='filter' color='var(--primary)' />} text='Name Filter' />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <Dropdown.Item onClick={() => handleNameFilterChange('asc')}>
                                            <Form.Check
                                                type='radio'
                                                id='name-asc'
                                                name='name-filter'
                                                label='Ascending'
                                                checked={filters.name === 'asc'}
                                            />
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => handleNameFilterChange('desc')}>
                                            <Form.Check
                                                type='radio'
                                                label='Descending'
                                                id='name-desc'
                                                name='name-filter'
                                                checked={filters.name === 'desc'}
                                            />
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="custom_table position-relative">
                    {loading
                        ? (<MainLoader />)
                        : employeesList?.items?.length ? (
                            <>
                                <div>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Location</th>
                                                {!isEmployee() && <th>Actions</th>}
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {employeesList?.items?.map(data => {
                                                return (
                                                    <tr key={data._id}>
                                                        <td onClick={() => navigate('/employees/' + data._id)} title={data.name}>{slice(data.name, 20)}</td>
                                                        <td title={data.location}>{slice(data.location, 20)}</td>
                                                        {!isEmployee() && <td>
                                                            <div className="d-flex align-items-center gap-2 justify-content-center">
                                                                <Button
                                                                    title='Assign Department'
                                                                    className="p-1 bg-transparent border-0"
                                                                    icon={<IconResource type="assign" />}
                                                                    onClick={() => {
                                                                        setEmployeeData({ ...employeeData, id: data._id, name: data.name });
                                                                        setShowAssignDepartmentModal(true);
                                                                    }}
                                                                />
                                                                <Button
                                                                    title='Edit'
                                                                    className="p-1 bg-transparent border-0"
                                                                    icon={<IconResource type="edit" />}
                                                                    onClick={() => handleEditClick(data)}
                                                                />
                                                                <Button
                                                                    title='Delete'
                                                                    className="p-1 bg-transparent border-0"
                                                                    icon={<IconResource type="delete" />}
                                                                    onClick={() => {
                                                                        setEmployeeData(prev => ({ ...prev, id: data._id }));
                                                                        setShowConfirmModal(true);
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>

                                <CustomPagination
                                    activePage={activePage}
                                    onPageChange={onPageChange}
                                    pageLength={employeesList?.limit}
                                    totalData={employeesList?.total}
                                />
                            </>
                        ) : (<>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        {!isEmployee() && <th>Actions</th>}
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

                                <Button
                                    buttonType="primary"
                                    text="Add Employees"
                                    prefixIcon={<IconResource type="users" />}
                                    onClick={() => setModalShow(true)}
                                />
                            </div>
                        </>)}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Employees;
