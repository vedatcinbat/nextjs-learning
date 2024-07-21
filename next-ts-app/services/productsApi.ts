import apiCall from "./apiCall";

export const getProducts = () => {
    return apiCall({
        method: 'GET',
        url: '/api/products'
    });
}

export const getProduct = (id: string) => {
    return apiCall({
        method: 'GET',
        url: `/api/products/${id}`
    });
}