import { Flip, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let toastId = 'EMS';

export function warn(message) {
    showToast(message, 'warning');
}

export function info(message) {
    showToast(message, 'info');
}

export function success(message) {
    showToast(message, 'success');
}

export function error(message) {
    showToast(message, 'error');
}

function showToast(message, type) {
    const options = {
        position: 'top-center',
        toastId: toastId,
        autoClose: 5000,
        transition: Flip
    };

    switch (type) {
        case 'warning':
            options.type = "warning";
            break;
        case 'info':
            options.type = "info";
            break;
        case 'success':
            options.type = "success";
            break;
        case 'error':
            options.type = "error";
            break;
        default:
            options.type = "default";
    }

    if (toast.isActive(toastId)) {
        toast.update(toastId, { render: message, ...options });
    } else {
        toastId = toast(message, options);
    }
}
