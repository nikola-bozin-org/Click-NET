const ratePerHour = 180;
const ratePerMinute = ratePerHour / 60;
const ratePerSecond = ratePerMinute / 60;
const customRate = 2000;
const clients = new Map();
const staffClients = new Map();


module.exports={
    ratePerHour,
    ratePerMinute,
    ratePerSecond,
    customRate,
    clients,
    staffClients
}