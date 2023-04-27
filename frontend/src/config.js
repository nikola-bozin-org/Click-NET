const isDevelopment = process.env.NODE_ENV === 'development'
const API_BASE_URL = isDevelopment? process.env.REACT_APP_API_BASE_URL_LOCAL:process.env.REACT_APP_API_BASE_URL_PRODUCTION;

//User
export const userBalance=`${API_BASE_URL}/user/balance`
export const userDiscount=`${API_BASE_URL}/user/discount`
export const userXp=`${API_BASE_URL}/user/xp`
export const userActions =`${API_BASE_URL}/user/actions`

//Users
export const createUser=`${API_BASE_URL}/users/createUser`
export const allUsers=`${API_BASE_URL}/users`
export const deleteUser=`${API_BASE_URL}/users`

//Sessions
export const loginStaff=`${API_BASE_URL}/session/loginStaff`
export const allSessions = `${API_BASE_URL}/session/allSessions`

//Payments
export const payment=`${API_BASE_URL}/payments/payment`
export const paymentByReceipt = `${API_BASE_URL}/payments/getPaymentByReceipt`

//CashRegister
export const getCurrentSessionPayments=`${API_BASE_URL}/cashRegister/getCurrentSessionPayments`
export const closeCashRegisterSession = `${API_BASE_URL}/cashRegister/closeCashRegisterSession`
export const getCurrentCashRegisterSession = `${API_BASE_URL}/cashRegister/getCurrentSession`
export const openCashRegisterSession = `${API_BASE_URL}/cashRegister/openCashRegisterSession`

//Utils
export const workstationLimit = `${API_BASE_URL}/utils/workstationLimit`

//Workstation
export const addNewWorkstation=`${API_BASE_URL}/workstation/`

//-------------------------------------------------------------------------------------------------------------------



export const employeeHeaders_USERS = ['All users','Session history','Balance history','Receipt history','Passes history']
export const adminHeaders_USERS = ['Roles and user access','User types']

export const delay_ERROR = 4000;
export const delay_ACCEPT = 2500;

export const userRoles = [
  {
    name: 'Admin',
    color: '#cc2234',
  },
  {
    name: 'Employee',
    color: '#e57028',
  },
  {
    name: 'Default',
    color: '#1dbbef',
  },
  {
    name: 'Night',
    color: '#3f62a3',
  },
  {
    name: 'Postpaid',
    color: '#ff5cb8',
  },
];
export const zones = {
    Pro:'Pro',
    Lobby:'Lobby',
}
export const zoneColors = {
  Pro:'green',
  Lobby:'red'
}

export const pcRole = {
  Offline:'rgb(48,48,48)',
  Online:'#82c22d',
  Support:'#ffdc51'
}

export const pcAdditionalInfo = [
  {
    name:"10 mins left",
    color:'#7d1829'
  },
  {
    name:"Reserved",
    color:'#544db1'
  }
]

export const tableRowClickedBehaviour={
  NotClickable:-1,
  User:0,
}


export const pcMap_N = 8;
export const pcMap_M = 11;

export const maxRefundTimeLimitHours = 48;