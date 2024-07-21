import apiCall from './apiCall';

export const getUsers = async () => {
    return apiCall({
        method: 'GET',
        url: '/api/users',
    }).then((data) => {
        return data.users;
    });
}

export const getUser = async (id: string) => {
    return apiCall({
        method: 'GET',
        url: `/api/users/${id}`,
    }).then((data) => {
        return data.user;
    });
}