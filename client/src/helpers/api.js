import { get, patch, post, del } from './apiProvider';
import * as urlConstants from '../constants/urlConstants';

export function login(reqData) {
    return post(urlConstants.LOGIN, reqData);
}

export function register(reqData) {
    return post(urlConstants.REGISTER, reqData);
}

export function getDepartments(query) {
    return get(urlConstants.DEPARTMENTS + query);
}

export function createDepartment(_, reqData) {
    return post(urlConstants.DEPARTMENTS, reqData);
}

export function updateDepartment(slug, reqData) {
    return patch(urlConstants.DEPARTMENTS + '/' + slug, reqData);
}

export function deleteDepartment(slug) {
    return del(urlConstants.DEPARTMENTS + '/' + slug);
}

export function assignDepartment(reqData) {
    return patch(urlConstants.DEPARTMENTS + '/assign', reqData);
}

export function getEmployees(query) {
    return get(urlConstants.EMPLOYEES + query);
}

export function getEmployeeDetails(id) {
    return get(urlConstants.EMPLOYEES + '/' + id);
}

export function createEmployee(_, reqData) {
    return post(urlConstants.EMPLOYEES, reqData);
}

export function updateEmployee(id, reqData) {
    return patch(urlConstants.EMPLOYEES + '/' + id, reqData);
}

export function deleteEmployee(id) {
    return del(urlConstants.EMPLOYEES + '/' + id);
}

