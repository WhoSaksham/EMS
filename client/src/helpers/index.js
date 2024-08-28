import { DEPARTMENTS, EMPLOYEE, USER_DATA } from "../constants/appConstants"

export const isEmployee = () => {
    return JSON.parse(localStorage.getItem(USER_DATA))?.role === EMPLOYEE;
}

export const convertAndStoreDepartmentOptions = (list) => {
    const departmentOptions = Array.isArray(list) ? list?.map(d => ({ label: d.name, value: d._id })) : [];
    localStorage.setItem(DEPARTMENTS, JSON.stringify(departmentOptions));

    return departmentOptions;
}
