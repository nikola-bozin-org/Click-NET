const axios = require("axios");

const isValidIP = (ipAddress) => {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipRegex.test(ipAddress);
};

const isValidMAC = (macAddress) => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(macAddress);
};

const checkLocalHostIP = (ip) => {
  if (ip === "::1") return "192.168.0.10";
  return ip;
};
const isUserLogedIn = async (username) => {
  try {
    const response = await axios.get(
      `${process.env.CLIENTS_API_BASE_URL_LOCAL}/clients`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.info(response.data)
  } catch (e) {
    console.info(e.response.data)
  }
};


module.exports = {
  isValidIP,
  isValidMAC,
  checkLocalHostIP,
  isUserLogedIn,
};
