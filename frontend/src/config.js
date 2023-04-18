const isDevelopment = process.env.NODE_ENV === 'developmentd'
const API_BASE_URL = isDevelopment? process.env.REACT_APP_API_BASE_URL_LOCAL:process.env.REACT_APP_API_BASE_URL_PRODUCTION;

export const loginStaff=`${API_BASE_URL}/session/loginStaff`
export const allUsers=`${API_BASE_URL}/users`
export const allSessions = `${API_BASE_URL}/session/allSessions`
export const getCurrentSessionPayments=`${API_BASE_URL}/cashRegister/getCurrentSessionPayments`
export const payment=`${API_BASE_URL}/payments/payment`
export const createUser=`${API_BASE_URL}/users/createUser`

export const employeeHeaders_USERS = ['All users','Session history','Balance history','Receipt history','Passes history']
export const adminHeaders_USERS = ['Roles and user access','User types']