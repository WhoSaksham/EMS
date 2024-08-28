export const isNullOrEmpty = (data) => {
    return data === null || data === undefined || data.toString().trim().length < 1
}

export function isEmailValid(email) {
    const regex = /^(([A-Za-z0-9](?!.*\.{2})[A-Za-z0-9_\-\.]+[A-Za-z0-9])|([A-Za-z0-9]{1,60}))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,15}|[0-9]{1,3})(\]?)$/; /* eslint-disable-line */
    return regex.test(email);
}

export const slice = (data, length = 10) => {
    let newData = data;

    if (data?.length > length) {
        newData = data?.slice(0, length) + '...';
    }

    return newData;
}