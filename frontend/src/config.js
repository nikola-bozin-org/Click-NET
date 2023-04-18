const isDevelopment = process.env.NODE_ENV === 'development'
const API_BASE_URL = isDevelopment? process.env.REACT_APP_API_BASE_URL_LOCAL:process.env.REACT_APP_API_BASE_URL_PRODUCTION;

//Users
export const createUser=`${API_BASE_URL}/users/createUser`
export const allUsers=`${API_BASE_URL}/users`

//Sessions
export const loginStaff=`${API_BASE_URL}/session/loginStaff`
export const allSessions = `${API_BASE_URL}/session/allSessions`

//Payments
export const payment=`${API_BASE_URL}/payments/payment`

//CashRegister
export const getCurrentSessionPayments=`${API_BASE_URL}/cashRegister/getCurrentSessionPayments`
export const closeCashRegisterSession = `${API_BASE_URL}/cashRegister/closeCashRegisterSession`
export const getCurrentCashRegisterSession = `${API_BASE_URL}/cashRegister/getCurrentSession`


export const employeeHeaders_USERS = ['All users','Session history','Balance history','Receipt history','Passes history']
export const adminHeaders_USERS = ['Roles and user access','User types']

export const delay_ERROR = 4000;
export const delay_ACCEPT = 2500;