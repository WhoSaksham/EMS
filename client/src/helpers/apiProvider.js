import { USER_DATA } from '../constants/appConstants';
import { BASE_URL } from '../constants/urlConstants';
import { SUCCESS_CODE, UNAUTHORIZED_ERROR_CODE, RESOURCE_CREATED, BAD_REQUEST, SERVER_ERROR, NOT_FOUND_CODE } from '../constants/responseCodes';
import axios from 'axios';

function handleResponse(response) {
    if (response?.data?.code === SUCCESS_CODE || response?.data?.code === RESOURCE_CREATED) {
        response.data.ok = true;
    } else if (response?.data.code === UNAUTHORIZED_ERROR_CODE) {
        localStorage.clear();
        window.location.replace('/');
        return;
    } else {
        response.data.ok = false;
    }

    return response.data;
}

function handleError(error) {
    if (error?.response?.data?.code === BAD_REQUEST || error?.response?.data?.code === SERVER_ERROR || error?.response?.data?.code === NOT_FOUND_CODE) {
        error.response.data.ok = false;
        return error.response.data;
    } else if (error?.response?.data?.code === UNAUTHORIZED_ERROR_CODE) {
        localStorage.clear();
        window.location.replace('/');
        return;
    }
}

const getHeaders = () => {
    const token = JSON.parse(localStorage.getItem(USER_DATA))?.token;
    return {
        'Accept': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const get = (query) => {
    const headers = getHeaders();

    return axios
        .get(BASE_URL + query, { headers })
        .then(handleResponse)
        .catch(handleError);
};

export const post = (query, body) => {
    const headers = getHeaders();

    return axios
        .post(BASE_URL + query, body, { headers })
        .then(handleResponse)
        .catch(handleError);
};

export const patch = (query, body) => {
    const headers = getHeaders();

    return axios
        .patch(BASE_URL + query, body, { headers })
        .then(handleResponse)
        .catch(handleError);
};

export const del = (query) => {
    const headers = getHeaders();

    return axios
        .delete(BASE_URL + query, { headers })
        .then(handleResponse)
        .catch(handleError);
};
