export const extractHours = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
}
export const extractDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
}
export const fixPaymentsDate = (payments) => {
    const updatedPayments = payments.map((payment) => {
        return {
            ...payment,
            paymentDate: extractHours(payment.paymentDate),
        };
    });
    return updatedPayments;
}
export const filterObjectByKeys = (obj, keys) => {
    return keys.reduce((filteredObj, key) => {
        if (obj.hasOwnProperty(key)) {
            filteredObj[key] = obj[key];
        }else{
            filteredObj[key] = '';
        }
        return filteredObj;
    }, {});
};
export const capitalizeFirstLetter = (str) => {
    if (!str || typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
export const formatNumber = (number) =>{
    return Intl.NumberFormat().format(number);
}

