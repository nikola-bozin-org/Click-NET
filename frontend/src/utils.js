export const extractHours = (date) => {
    const dateObj = new Date(date);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return time;
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
        }
        return filteredObj;
    }, {});
};
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
export const formatNumber = (number) =>{
    return Intl.NumberFormat().format(number);
}