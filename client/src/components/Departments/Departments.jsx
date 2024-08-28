import { useEffect, useState } from "react";
import { warn, success, error } from "../../helpers/toast";
import * as apiHelper from "../../helpers/api";
import * as stringConstants from "../../constants/stringConstants";
import Text from "../../_widgets/Text/Text";
import Input from "../../_widgets/Input/Input";
import noData from "../../assets/noData.png";
import Button from "../../_widgets/Button/Button";
import NavBar from "../../_widgets/NavBar/NavBar";
import { Row, Col, Form, Table } from "react-bootstrap";
import CustomPagination from "../../_widgets/CustomPagination/CustomPagination";
import IconResource from "../../_widgets/IconResource/IconResource";
import MainLoader from "../../_widgets/Loader/MainLoader";
import AnimatedPage from "../../_widgets/AnimatedPage/AnimatedPage";
import BasicModal from "../../_widgets/Modal/BasicModal";
import { isNullOrEmpty, slice } from "../../utils";
import ModalConfirmation from "../../_widgets/Modal/ModalConfirmation";
import { convertAndStoreDepartmentOptions } from "../../helpers";

const Departments = () => {
    const [modalShow, setModalShow] = useState(false);
    const initialDepartmentData = {
        name: "",
        desc: "",
        slug: "",
        action: "Add",
    };
    const [departmentData, setDepartmentData] = useState(initialDepartmentData);
    const [departmentList, setDepartmentList] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleClose = () => {
        setModalShow(false);
        setDepartmentData(initialDepartmentData);
    };

    const onPageChange = (page) => {
        if (page !== activePage) {
            setActivePage(page);
        }
    };

    useEffect(() => {
        getDepartmentList();
    }, [activePage]);

    const getDepartmentList = () => {
        if (!loading) {
            setLoading(true);

            apiHelper.getDepartments(`?page=${activePage}`).then(response => {
                if (response?.ok) {
                    setDepartmentList(response?.data);
                    convertAndStoreDepartmentOptions(response?.data?.items);
                } else {
                    warn(response?.message);
                }
                setLoading(false);
            });
        }
    }

    const validateData = () => {
        const { name } = departmentData;

        if (isNullOrEmpty(name)) {
            warn(stringConstants.NAME_REQUIRED('Department'));
            return false;
        }

        return true;
    };

    const handleEditClick = (data) => {
        const { name, desc, slug } = data;
        setDepartmentData({ name, desc, slug, action: "Edit" });
        setModalShow(true);
    }

    const upsertDepartment = () => {
        if (!buttonLoading) {
            if (validateData()) {
                setButtonLoading('upsert');
                const { name, desc, slug, action } = departmentData;

                apiHelper[action === 'Add' ? 'createDepartment' : 'updateDepartment'](slug, { name, desc }).then(response => {
                    if (response?.ok) {
                        getDepartmentList();
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
            const { slug } = departmentData;
            apiHelper.deleteDepartment(slug).then(response => {
                if (response?.ok) {
                    getDepartmentList();
                    success(response.message);
                    setDepartmentData(initialDepartmentData);
                    setShowConfirmModal(false);
                } else {
                    error(response?.message);
                }
                setButtonLoading(false);
            });
        }
    }

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

            <BasicModal
                show={modalShow}
                size="lg"
                setModalShow={setModalShow}
                handleClose={handleClose}
                heading={`${departmentData.action} Department`}
                footer
                formID="upsert-department"
                loading={buttonLoading === 'upsert'}
                button1Text="Save"
                button1Click={upsertDepartment}
            >
                <div className="card_ui">
                    <Row>
                        <Col xl={12}>
                            <div className="white_card text-start">
                                <Form id="add-patient-visit" noValidate>
                                    <Row>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Department Name"
                                                type="text"
                                                label="Name"
                                                required
                                                isRequired
                                                value={departmentData.name}
                                                onChange={e => {
                                                    if (e.target.value.length <= 50) {
                                                        setDepartmentData({ ...departmentData, name: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(50));
                                                    }
                                                }}
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} lg={6} sm={12}>
                                            <Input
                                                placeholder="Enter Department Description"
                                                type="text"
                                                as="textarea"
                                                rows={1}
                                                label="Description"
                                                value={departmentData.desc}
                                                onChange={e => {
                                                    if (e.target.value.length <= 50) {
                                                        setDepartmentData({ ...departmentData, desc: e.target.value });
                                                    } else {
                                                        warn(stringConstants.maximumLengthAllowed(50));
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

            <NavBar
                button={"Add Department"}
                buttonIcon="departments"
                heading="Departments"
                onClick={() => document.body.classList.toggle("side_active")}
                setModalShow={setModalShow}
                Icon="menu"
            />

            <div className="patient_list white_card">
                <div className="top_bar">
                    <Text type="h2" text="All Departments List" />
                </div>

                <div className="custom_table position-relative">
                    {loading
                        ? (<MainLoader />)
                        : departmentList?.items?.length ? (
                            <>
                                <div>
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {departmentList?.items?.map(data => {
                                                return (
                                                    <tr key={data.id}>
                                                        <td title={data.name}>{slice(data.name, 20)}</td>
                                                        <td title={data.desc}>{data.desc ? slice(data.desc, 20) : '-'}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center gap-2 justify-content-center">
                                                                <Button
                                                                    title='Edit'
                                                                    className="p-1 bg-transparent border-0"
                                                                    icon={<IconResource type="edit" />}
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditClick(data);
                                                                    }}
                                                                />
                                                                <Button
                                                                    title='Delete'
                                                                    className="p-1 bg-transparent border-0"
                                                                    icon={<IconResource type="delete" />}
                                                                    onClick={() => {
                                                                        setDepartmentData(prev => ({ ...prev, slug: data.slug }));
                                                                        setShowConfirmModal(true);
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </Table>
                                </div>

                                <CustomPagination
                                    activePage={activePage}
                                    onPageChange={onPageChange}
                                    pageLength={departmentList?.limit}
                                    totalData={departmentList?.total}
                                />
                            </>
                        ) : (<>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Actions</th>
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
                                    text="Add Department"
                                    prefixIcon={<IconResource type="departments" />}
                                    onClick={() => setModalShow(true)}
                                />
                            </div>
                        </>)}
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Departments;
