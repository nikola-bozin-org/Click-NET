const isDevelopment = process.env.NODE_ENV === 'development'
const API_BASE_URL = isDevelopment? process.env.REACT_APP_API_BASE_URL_LOCAL:process.env.REACT_APP_API_BASE_URL_PRODUCTION;

export const endpoints = {
    loginStaff:`${API_BASE_URL}/session/loginStaff`,
    allUsers:`${API_BASE_URL}/users`,
    getCurrentSessionPayments:`${API_BASE_URL}/cashRegister/getCurrentSessionPayments`,
    payment:`${API_BASE_URL}/payments/payment`,
    createUser:`${API_BASE_URL}/users/createUser`
}